import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  levels: { name: string; points: number; description: string }[];
}

export interface GradingStudentData {
  id: string;
  studentName: string;
  studentId: string;
  avatar: string;
  submittedAt: string;
  receiptHash: string;
  deliverables: {
    name: string;
    type: 'pdf' | 'code' | 'text';
    size: string;
    content: string;
  }[];
  studentNote: string;
  aiSuggestedScore: number;
  aiCommentary: string;
}

@Component({
  selector: 'app-assignment-grading',
  imports: [FormsModule],
  templateUrl: './assignment-grading.html',
  styleUrl: './assignment-grading.css',
})
export default class AssignmentGrading {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  goBack(): void {
    this.location.back();
  }

  readonly assignmentTitle = signal<string>('Assignment 1: Introduction Essay');
  readonly assignmentPrompt = signal<string>(
    'Please write a 500-word introduction essay about why you chose this course. Make sure to cover your background and experience, what you hope to achieve by the end of the semester, and any specific topics you are most excited about.'
  );

  readonly activeFileTab = signal<number>(0);
  readonly feedbackText = signal<string>(
    'Strong analytical background and clear academic goals articulated. The connection between multivariable geometry and fluid mechanics was particularly well argued.'
  );
  readonly statusMessage = signal<string>('');

  // Roster of students to step through
  readonly students = signal<GradingStudentData[]>([
    {
      id: 'sub-1',
      studentName: 'Alex Mercer',
      studentId: 'STU-88219',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      submittedAt: 'Oct 16, 2026 at 4:18 PM',
      receiptHash: 'LC-SUB-2026-8942-F9A',
      deliverables: [
        {
          name: 'essay_intro_alex.pdf',
          type: 'pdf',
          size: '1.4 MB',
          content: `Introduction to Applied Multivariable Systems

My academic journey in engineering began with physical simulations of aerodynamics. Choosing this advanced course represents a natural progression toward mastering the analytical calculus underpinning Navier-Stokes vector fields and surface flux theorems.

Throughout this semester, my primary objective is to build rigorous mathematical intuition for 3D coordinate transformations and line integrals. Having worked with discrete numerical approximations, I am particularly eager to explore how continuous divergence theorems bridge pure mathematics with computational fluid dynamics.

In summary, this curriculum will empower me to tackle complex fluid flow and electromagnetic modeling problems with both theoretical depth and computational confidence.`
        },
        {
          name: 'reflection_notes.txt',
          type: 'text',
          size: '4 KB',
          content: 'Completed all required sections in APA format. Looking forward to the Stokes Theorem laboratory sessions.'
        }
      ],
      studentNote: 'Please note I included an extra paragraph discussing cross-disciplinary fluid dynamics applications.',
      aiSuggestedScore: 92,
      aiCommentary: 'The essay covers all required prompt items (background, semester goals, topic excitement). Tone is formal, vocabulary is precise, and the student provides concrete contextual examples.'
    },
    {
      id: 'sub-2',
      studentName: 'Maya Lin',
      studentId: 'STU-88220',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      submittedAt: 'Oct 16, 2026 at 2:05 PM',
      receiptHash: 'LC-SUB-2026-7811-A2B',
      deliverables: [
        {
          name: 'introductory_essay_lin.pdf',
          type: 'pdf',
          size: '2.1 MB',
          content: 'Essay on theoretical physics motivations and differential geometry foundations...'
        }
      ],
      studentNote: 'Submitted on time with full bibliography.',
      aiSuggestedScore: 94,
      aiCommentary: 'Clear, well-structured arguments with deep conceptual insights.'
    },
    {
      id: 'sub-4',
      studentName: 'Elena Rostova',
      studentId: 'STU-88222',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      submittedAt: 'Oct 17, 2026 at 11:15 AM',
      receiptHash: 'LC-SUB-2026-9041-E5F',
      deliverables: [
        {
          name: 'elena_introduction.pdf',
          type: 'pdf',
          size: '1.2 MB',
          content: 'Personal statement regarding robotics kinematics and spatial coordinate mapping...'
        }
      ],
      studentNote: 'Includes CAD projection references.',
      aiSuggestedScore: 89,
      aiCommentary: 'Strong technical grounding with solid articulation of semester objectives.'
    }
  ]);

  readonly currentStudentIndex = signal<number>(0);

  readonly currentStudent = computed(
    () => this.students()[this.currentStudentIndex()] || this.students()[0]
  );

  // Rubric criteria directly mirroring features/assessment/pages/grading/grading.ts
  readonly criteria = signal<RubricCriterion[]>([
    {
      id: 'c1',
      name: 'Content & Topic Comprehension',
      description: 'Covers background, goals, and specific topic interest',
      levels: [
        { name: 'Excellent', points: 25, description: 'All prompt items thoroughly addressed with depth' },
        { name: 'Good', points: 20, description: 'Solid coverage with minor gaps in details' },
        { name: 'Fair', points: 15, description: 'Basic overview, missing key aspects' },
        { name: 'Poor', points: 10, description: 'Lacks required prompt components' }
      ]
    },
    {
      id: 'c2',
      name: 'Reasoning & Argument Flow',
      description: 'Logical coherence and clarity of purpose',
      levels: [
        { name: 'Excellent', points: 25, description: 'Highly logical and compelling narrative' },
        { name: 'Good', points: 20, description: 'Mostly clear progression of thoughts' },
        { name: 'Fair', points: 15, description: 'Some logic gaps between sections' },
        { name: 'Poor', points: 10, description: 'Unstructured and difficult to follow' }
      ]
    },
    {
      id: 'c3',
      name: 'Technical & Academic Rigor',
      description: 'Accurate terminology and realistic academic targets',
      levels: [
        { name: 'Excellent', points: 25, description: 'No factual or conceptual errors' },
        { name: 'Good', points: 20, description: 'Minor imprecision in terminology' },
        { name: 'Fair', points: 15, description: 'Several conceptual misunderstandings' },
        { name: 'Poor', points: 10, description: 'Inaccurate understanding of course prerequisites' }
      ]
    },
    {
      id: 'c4',
      name: 'Presentation & Mechanics',
      description: 'Grammar, style, and formatting compliance',
      levels: [
        { name: 'Excellent', points: 25, description: 'Flawless prose, proper word count' },
        { name: 'Good', points: 20, description: 'Minor typographic or formatting slips' },
        { name: 'Fair', points: 15, description: 'Noticeable grammar or format issues' },
        { name: 'Poor', points: 10, description: 'Unedited and sloppy presentation' }
      ]
    }
  ]);

  readonly selectedScores = signal<Record<string, number>>({
    'c1': 25,
    'c2': 20,
    'c3': 25,
    'c4': 20
  });

  readonly totalScore = computed(() => {
    const scores = this.selectedScores();
    return Object.values(scores).reduce((sum, val) => sum + val, 0);
  });

  constructor() {
    this.route.params.subscribe((params) => {
      if (params['submissionId']) {
        const foundIndex = this.students().findIndex(
          (s) => s.id === params['submissionId']
        );
        if (foundIndex !== -1) {
          this.currentStudentIndex.set(foundIndex);
        }
      }
    });
  }

  selectLevel(criterionId: string, points: number): void {
    this.selectedScores.update((scores) => ({
      ...scores,
      [criterionId]: points,
    }));
  }

  prevStudent(): void {
    if (this.currentStudentIndex() > 0) {
      this.currentStudentIndex.update((i) => i - 1);
      this.resetStudentEvaluation();
    }
  }

  saveAndNext(): void {
    this.saveGrade();
    if (this.currentStudentIndex() < this.students().length - 1) {
      this.currentStudentIndex.update((i) => i + 1);
      this.resetStudentEvaluation();
    }
  }

  private resetStudentEvaluation(): void {
    this.activeFileTab.set(0);
    this.selectedScores.set({
      'c1': 25,
      'c2': 20,
      'c3': 25,
      'c4': 20
    });
  }

  saveGrade(): void {
    this.statusMessage.set(
      `Grade for ${this.currentStudent().studentName} saved (${this.totalScore()} / 100)`
    );
    setTimeout(() => this.statusMessage.set(''), 3000);
  }

  publishGrade(): void {
    this.statusMessage.set(
      `Grade published to student gradebook for ${this.currentStudent().studentName}!`
    );
    setTimeout(() => this.statusMessage.set(''), 3000);
  }
}
