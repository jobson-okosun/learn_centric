import { Component, signal, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface AssessmentItem {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  type: 'Exam' | 'Quiz' | 'Diagnostic';
  status: 'available' | 'upcoming' | 'completed';
  durationMinutes: number;
  questionCount: number;
  totalPoints: number;
  weightPercentage: number;
  dueDate?: string;
  scheduledDate?: string;
  proctoringRules: string;
  description: string;
  // Completed fields
  score?: number;
  grade?: string;
  completedAt?: string;
  timeSpent?: string;
}

@Component({
  imports: [RouterLink, FormsModule, DecimalPipe],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export default class List {
  private router = inject(Router);

  readonly searchQuery = signal('');
  readonly activeTab = signal<'all' | 'available' | 'upcoming' | 'completed'>('all');
  readonly courseFilter = signal('all');
  readonly typeFilter = signal('all');

  // Pre-launch modal
  readonly selectedExam = signal<AssessmentItem | null>(null);
  readonly isRulesModalOpen = signal(false);
  readonly honorCodeAgreed = signal(false);

  readonly assessments = signal<AssessmentItem[]>([
    {
      id: 'math301-midterm',
      title: 'Multivariable Calculus Midterm Examination',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus & Analytical Geometry',
      type: 'Exam',
      status: 'available',
      durationMinutes: 90,
      questionCount: 20,
      totalPoints: 100,
      weightPercentage: 25,
      dueDate: 'Oct 18, 2026 · 11:59 PM',
      proctoringRules: 'Closed Book · Single Attempt · Autosave Active',
      description: 'Comprehensive evaluation covering partial derivatives, double & triple integrals, Lagrange multipliers, and surface flux theorems.',
    },
    {
      id: 'phys201-quiz4',
      title: 'Quantum Mechanics & Wavefunctions Quiz 4',
      courseCode: 'PHYS-201',
      courseName: 'Modern Quantum Mechanics',
      type: 'Quiz',
      status: 'available',
      durationMinutes: 30,
      questionCount: 10,
      totalPoints: 40,
      weightPercentage: 10,
      dueDate: 'Oct 17, 2026 · 11:59 PM',
      proctoringRules: 'Formula Sheet Permitted · Auto-Graded',
      description: 'Covers the time-independent Schrödinger equation, infinite square wells, and probability density calculations.',
    },
    {
      id: 'cs210-midterm',
      title: 'Data Structures & Algorithmic Complexity Benchmark',
      courseCode: 'CS-210',
      courseName: 'Algorithms & Data Structures',
      type: 'Exam',
      status: 'available',
      durationMinutes: 75,
      questionCount: 25,
      totalPoints: 100,
      weightPercentage: 20,
      dueDate: 'Oct 19, 2026 · 5:00 PM',
      proctoringRules: 'Closed Book · Built-in Code Evaluator',
      description: 'Balanced theoretical and trace-based assessment covering balanced BSTs, graph traversals, amortized complexity, and dynamic programming.',
    },
    {
      id: 'math301-quiz',
      title: 'Vector Fields & Green’s Theorem Formative Quiz',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus & Analytical Geometry',
      type: 'Quiz',
      status: 'upcoming',
      durationMinutes: 20,
      questionCount: 8,
      totalPoints: 25,
      weightPercentage: 5,
      scheduledDate: 'Opens Oct 22, 2026 · 9:00 AM',
      proctoringRules: 'Open Book · Unlimited Scratch Paper',
      description: 'Formative check on circulation, curl, line integrals over closed curves, and orientation conventions.',
    },
    {
      id: 'bio105-final',
      title: 'Cellular Respiration & Molecular Biology Final Exam',
      courseCode: 'BIO-105',
      courseName: 'Introduction to Cell Biology',
      type: 'Exam',
      status: 'upcoming',
      durationMinutes: 120,
      questionCount: 50,
      totalPoints: 150,
      weightPercentage: 35,
      scheduledDate: 'Opens Oct 26, 2026 · 10:00 AM',
      proctoringRules: 'Proctored · Strict Timed Window',
      description: 'Cumulative assessment covering glycolysis, Krebs cycle, electron transport chains, and cell regulation pathways.',
    },
    {
      id: 'chem110-exam1',
      title: 'Stoichiometry & Chemical Equilibrium Exam 1',
      courseCode: 'CHEM-110',
      courseName: 'Principles of General Chemistry',
      type: 'Exam',
      status: 'completed',
      durationMinutes: 60,
      questionCount: 25,
      totalPoints: 100,
      weightPercentage: 20,
      score: 94,
      grade: 'A',
      completedAt: 'Oct 10, 2026',
      timeSpent: '54 mins',
      proctoringRules: 'Closed Book · Periodic Table Provided',
      description: 'Evaluated quantitative molar stoichiometry, Le Chatelier’s principle, and equilibrium constant equilibrium shifts.',
    },
    {
      id: 'phys201-diag',
      title: 'Special Relativity Diagnostic Assessment',
      courseCode: 'PHYS-201',
      courseName: 'Modern Quantum Mechanics',
      type: 'Diagnostic',
      status: 'completed',
      durationMinutes: 30,
      questionCount: 12,
      totalPoints: 40,
      weightPercentage: 5,
      score: 38,
      grade: 'A',
      completedAt: 'Oct 04, 2026',
      timeSpent: '22 mins',
      proctoringRules: 'Diagnostic Benchmark · No Penalty',
      description: 'Baseline competency check for Lorentz transformations, time dilation, and relativistic momentum.',
    },
    {
      id: 'math301-quiz2',
      title: 'Partial Derivatives & Lagrange Multipliers Quiz',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus & Analytical Geometry',
      type: 'Quiz',
      status: 'completed',
      durationMinutes: 35,
      questionCount: 12,
      totalPoints: 50,
      weightPercentage: 10,
      score: 48,
      grade: 'A',
      completedAt: 'Sep 28, 2026',
      timeSpent: '29 mins',
      proctoringRules: 'Closed Book · Formative Assessment',
      description: 'Tested constrained optimization problems, gradient vectors, and tangent plane approximations.',
    },
  ]);

  // Derived metrics
  readonly availableCount = computed(() => this.assessments().filter(a => a.status === 'available').length);
  readonly upcomingCount = computed(() => this.assessments().filter(a => a.status === 'upcoming').length);
  readonly completedCount = computed(() => this.assessments().filter(a => a.status === 'completed').length);

  readonly averageScore = computed(() => {
    const completed = this.assessments().filter(a => a.status === 'completed' && a.score !== undefined && a.totalPoints > 0);
    if (completed.length === 0) return 0;
    const totalEarned = completed.reduce((sum, item) => sum + (item.score || 0), 0);
    const totalMax = completed.reduce((sum, item) => sum + item.totalPoints, 0);
    return Math.round((totalEarned / totalMax) * 1000) / 10;
  });

  readonly coursesList = computed(() => {
    const set = new Set(this.assessments().map(a => a.courseCode));
    return Array.from(set);
  });

  readonly filteredAssessments = computed(() => {
    const tab = this.activeTab();
    const query = this.searchQuery().toLowerCase().trim();
    const course = this.courseFilter();
    const type = this.typeFilter();

    return this.assessments().filter(item => {
      // Tab filter
      if (tab !== 'all' && item.status !== tab) return false;

      // Course filter
      if (course !== 'all' && item.courseCode !== course) return false;

      // Type filter
      if (type !== 'all' && item.type !== type) return false;

      // Search query
      if (query) {
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchCode = item.courseCode.toLowerCase().includes(query);
        const matchCourseName = item.courseName.toLowerCase().includes(query);
        if (!matchTitle && !matchCode && !matchCourseName) return false;
      }

      return true;
    });
  });

  openLaunchModal(exam: AssessmentItem) {
    this.selectedExam.set(exam);
    this.honorCodeAgreed.set(false);
    this.isRulesModalOpen.set(true);
  }

  closeLaunchModal() {
    this.isRulesModalOpen.set(false);
    this.selectedExam.set(null);
    this.honorCodeAgreed.set(false);
  }

  startExamination() {
    const exam = this.selectedExam();
    if (!exam || !this.honorCodeAgreed()) return;
    this.closeLaunchModal();
    this.router.navigate(['/learn/assessments', exam.id, 'runner']);
  }
}
