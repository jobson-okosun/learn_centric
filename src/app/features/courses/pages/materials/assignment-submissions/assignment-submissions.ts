import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface StudentSubmission {
  id: string;
  studentName: string;
  studentId: string;
  avatar: string;
  submittedAt: string;
  files: { name: string; size: string }[];
  status: 'needs-grading' | 'graded' | 'late';
  score?: number;
  maxScore: number;
  grade?: string;
  receiptHash: string;
}

@Component({
  selector: 'app-assignment-submissions',
  imports: [RouterLink, FormsModule],
  templateUrl: './assignment-submissions.html',
  styleUrl: './assignment-submissions.css',
})
export default class AssignmentSubmissions {
  private readonly route = inject(ActivatedRoute);

  readonly courseId = signal<string>('');
  readonly assignmentId = signal<string>('a1');
  readonly assignmentTitle = signal<string>('Assignment 1: Introduction Essay');
  readonly maxPoints = signal<number>(100);

  readonly activeFilter = signal<'all' | 'needs-grading' | 'graded'>('all');
  readonly searchQuery = signal<string>('');

  readonly submissions = signal<StudentSubmission[]>([
    {
      id: 'sub-1',
      studentName: 'Alex Mercer',
      studentId: 'STU-88219',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      submittedAt: 'Oct 16, 2026 at 4:18 PM',
      files: [{ name: 'essay_intro_alex.pdf', size: '1.4 MB' }],
      status: 'needs-grading',
      maxScore: 100,
      receiptHash: 'LC-SUB-2026-8942-F9A',
    },
    {
      id: 'sub-2',
      studentName: 'Maya Lin',
      studentId: 'STU-88220',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      submittedAt: 'Oct 16, 2026 at 2:05 PM',
      files: [{ name: 'introductory_essay_lin.pdf', size: '2.1 MB' }],
      status: 'graded',
      score: 94,
      grade: 'A',
      maxScore: 100,
      receiptHash: 'LC-SUB-2026-7811-A2B',
    },
    {
      id: 'sub-3',
      studentName: 'David Kalu',
      studentId: 'STU-88221',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      submittedAt: 'Oct 15, 2026 at 8:40 PM',
      files: [{ name: 'kalu_background_essay.docx', size: '890 KB' }],
      status: 'graded',
      score: 88,
      grade: 'B+',
      maxScore: 100,
      receiptHash: 'LC-SUB-2026-6419-C3D',
    },
    {
      id: 'sub-4',
      studentName: 'Elena Rostova',
      studentId: 'STU-88222',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      submittedAt: 'Oct 17, 2026 at 11:15 AM',
      files: [{ name: 'elena_introduction.pdf', size: '1.2 MB' }],
      status: 'needs-grading',
      maxScore: 100,
      receiptHash: 'LC-SUB-2026-9041-E5F',
    },
    {
      id: 'sub-5',
      studentName: 'Marcus Vance',
      studentId: 'STU-88223',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      submittedAt: 'Oct 16, 2026 at 6:30 PM',
      files: [{ name: 'vance_essay_draft_v2.pdf', size: '1.8 MB' }],
      status: 'needs-grading',
      maxScore: 100,
      receiptHash: 'LC-SUB-2026-4420-G7H',
    },
    {
      id: 'sub-6',
      studentName: 'Sarah Jenkins',
      studentId: 'STU-88224',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
      submittedAt: 'Oct 14, 2026 at 3:12 PM',
      files: [{ name: 'jenkins_essay.pdf', size: '1.1 MB' }],
      status: 'graded',
      score: 96,
      grade: 'A',
      maxScore: 100,
      receiptHash: 'LC-SUB-2026-1190-J9K',
    },
  ]);

  readonly totalSubmissions = computed(() => this.submissions().length);
  readonly needsGradingCount = computed(
    () => this.submissions().filter((s) => s.status === 'needs-grading').length
  );
  readonly gradedCount = computed(
    () => this.submissions().filter((s) => s.status === 'graded').length
  );

  readonly filteredSubmissions = computed(() => {
    const filter = this.activeFilter();
    const query = this.searchQuery().toLowerCase().trim();

    return this.submissions().filter((s) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'needs-grading' && s.status === 'needs-grading') ||
        (filter === 'graded' && s.status === 'graded');

      const matchesQuery =
        !query ||
        s.studentName.toLowerCase().includes(query) ||
        s.studentId.toLowerCase().includes(query);

      return matchesFilter && matchesQuery;
    });
  });

  constructor() {
    this.route.params.subscribe((params) => {
      if (params['assignmentId']) {
        this.assignmentId.set(params['assignmentId']);
      }
    });

    this.route.parent?.params.subscribe((parentParams) => {
      if (parentParams['id']) {
        this.courseId.set(parentParams['id']);
      }
    });
  }

  setFilter(filter: 'all' | 'needs-grading' | 'graded'): void {
    this.activeFilter.set(filter);
  }
}
