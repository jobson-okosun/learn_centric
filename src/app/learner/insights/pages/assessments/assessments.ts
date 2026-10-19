import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

export interface AssessmentResultHistoryItem {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  type: 'Exam' | 'Quiz';
  completedDate: string;
  score: number;
  maxScore: number;
  grade: string;
  percentile: number;
  cohortAvg: number;
  status: 'Verified' | 'Curved';
}

@Component({
  selector: 'app-insights-assessments',
  imports: [RouterLink, FormsModule, DecimalPipe],
  templateUrl: './assessments.html',
  styleUrl: './assessments.css',
})
export default class Assessments {
  readonly searchQuery = signal<string>('');
  readonly selectedCourse = signal<string>('all');
  readonly selectedType = signal<string>('all');
  readonly activeFilter = signal<'all' | 'exams' | 'quizzes' | 'high-score'>('all');

  readonly assessments = signal<AssessmentResultHistoryItem[]>([
    {
      id: 'math301-midterm',
      title: 'Multivariable Calculus Midterm Examination',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus & Analytical Geometry',
      type: 'Exam',
      completedDate: 'Oct 15, 2026',
      score: 46,
      maxScore: 50,
      grade: 'A',
      percentile: 94,
      cohortAvg: 77.4,
      status: 'Curved',
    },
    {
      id: 'phys201-quiz4',
      title: 'Quantum Mechanics & Wavefunctions Quiz 4',
      courseCode: 'PHYS-201',
      courseName: 'Modern Quantum Mechanics',
      type: 'Quiz',
      completedDate: 'Oct 14, 2026',
      score: 36,
      maxScore: 40,
      grade: 'A-',
      percentile: 88,
      cohortAvg: 73.1,
      status: 'Verified',
    },
    {
      id: 'cs210-midterm',
      title: 'Data Structures & Algorithmic Complexity Benchmark',
      courseCode: 'CS-210',
      courseName: 'Algorithms & Data Structures',
      type: 'Exam',
      completedDate: 'Oct 11, 2026',
      score: 92,
      maxScore: 100,
      grade: 'A',
      percentile: 92,
      cohortAvg: 79.5,
      status: 'Verified',
    },
    {
      id: 'chem110-exam1',
      title: 'Stoichiometry & Chemical Equilibrium Exam 1',
      courseCode: 'CHEM-110',
      courseName: 'Principles of General Chemistry',
      type: 'Exam',
      completedDate: 'Oct 8, 2026',
      score: 94,
      maxScore: 100,
      grade: 'A',
      percentile: 95,
      cohortAvg: 75.0,
      status: 'Curved',
    },
    {
      id: 'bio105-quiz3',
      title: 'Cellular Respiration Pathways Quiz 3',
      courseCode: 'BIO-105',
      courseName: 'Introduction to Cell Biology',
      type: 'Quiz',
      completedDate: 'Oct 4, 2026',
      score: 28,
      maxScore: 30,
      grade: 'A',
      percentile: 90,
      cohortAvg: 71.2,
      status: 'Verified',
    },
    {
      id: 'math301-quiz2',
      title: 'Double Integrals in Polar Coordinates Quiz 2',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus & Analytical Geometry',
      type: 'Quiz',
      completedDate: 'Sep 29, 2026',
      score: 27,
      maxScore: 30,
      grade: 'A-',
      percentile: 86,
      cohortAvg: 72.8,
      status: 'Verified',
    },
    {
      id: 'phys201-quiz3',
      title: 'Infinite Square Wells & Boundary States Quiz 3',
      courseCode: 'PHYS-201',
      courseName: 'Modern Quantum Mechanics',
      type: 'Quiz',
      completedDate: 'Sep 24, 2026',
      score: 24,
      maxScore: 30,
      grade: 'B+',
      percentile: 79,
      cohortAvg: 69.4,
      status: 'Verified',
    },
    {
      id: 'cs210-quiz1',
      title: 'Balanced BST & Red-Black Trees Quiz 1',
      courseCode: 'CS-210',
      courseName: 'Algorithms & Data Structures',
      type: 'Quiz',
      completedDate: 'Sep 20, 2026',
      score: 30,
      maxScore: 30,
      grade: 'A+',
      percentile: 99,
      cohortAvg: 78.0,
      status: 'Verified',
    },
  ]);

  readonly totalCompleted = computed(() => this.assessments().length);

  readonly meanScore = computed(() => {
    const list = this.assessments();
    if (!list.length) return 0;
    const totalPercent = list.reduce(
      (sum, item) => sum + (item.score / item.maxScore) * 100,
      0
    );
    return Math.round((totalPercent / list.length) * 10) / 10;
  });

  readonly highestScorePercent = computed(() => {
    const list = this.assessments();
    return Math.max(
      ...list.map((item) => Math.round((item.score / item.maxScore) * 100))
    );
  });

  readonly filteredAssessments = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const course = this.selectedCourse();
    const type = this.selectedType();
    const filter = this.activeFilter();

    return this.assessments().filter((item) => {
      // Search
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.courseCode.toLowerCase().includes(q);

      // Course
      const matchesCourse = course === 'all' || item.courseCode === course;

      // Type
      const matchesType = type === 'all' || item.type === type;

      // Filter tabs
      let matchesFilter = true;
      if (filter === 'exams') matchesFilter = item.type === 'Exam';
      if (filter === 'quizzes') matchesFilter = item.type === 'Quiz';
      if (filter === 'high-score')
        matchesFilter = (item.score / item.maxScore) * 100 >= 90;

      return matchesSearch && matchesCourse && matchesType && matchesFilter;
    });
  });

  setFilter(filter: 'all' | 'exams' | 'quizzes' | 'high-score'): void {
    this.activeFilter.set(filter);
  }
}
