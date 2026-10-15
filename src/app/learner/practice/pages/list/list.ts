import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZardDropdownImports } from '@/shared/components/dropdown';

export interface PracticeDrill {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionCount: number;
  estimatedMinutes: number;
  topic: string;
  description: string;
  masteryScore: number;
  status: 'not-started' | 'in-progress' | 'mastered';
  isRecommended?: boolean;
  isWeakSpot?: boolean;
  xpReward: number;
}

@Component({
  imports: [RouterLink, FormsModule, ZardDropdownImports],
  selector: 'app-practice-list',
  styleUrl: './list.css',
  templateUrl: './list.html',
})
export default class List {
  readonly searchQuery = signal('');
  readonly selectedCourse = signal('all');
  readonly selectedCategory = signal<'all' | 'recommended' | 'weak-spots' | 'completed'>('all');
  readonly selectedDifficulty = signal('all');

  readonly practiceStreak = signal(5);
  readonly totalSolved = signal(142);
  readonly overallAccuracy = signal(86);
  readonly weakSpotsCount = computed(() => this.drills().filter((d) => d.isWeakSpot).length);

  readonly drills = signal<PracticeDrill[]>([
    {
      id: 'stokes-theorem',
      title: 'Stokes’ Theorem & Boundary Circulation',
      courseCode: 'MATH-204',
      courseName: 'Multivariable Calculus',
      difficulty: 'Intermediate',
      questionCount: 5,
      estimatedMinutes: 10,
      topic: 'Vector Calculus',
      description: 'Practice converting surface flux integrals of curl(F) into boundary line integrals with correct orientation rules.',
      masteryScore: 58,
      status: 'in-progress',
      isWeakSpot: true,
      isRecommended: true,
      xpReward: 50,
    },
    {
      id: 'mitosis-phases',
      title: 'Cellular Mitosis & Chromosome Mechanics',
      courseCode: 'BIO-101',
      courseName: 'Introduction to Biology',
      difficulty: 'Beginner',
      questionCount: 6,
      estimatedMinutes: 8,
      topic: 'Cell Biology',
      description: 'Identify mitotic phases (prophase through telophase) under microscope slide imagery with instant reasoning checks.',
      masteryScore: 82,
      status: 'mastered',
      isRecommended: false,
      xpReward: 40,
    },
    {
      id: 'schrodinger-wells',
      title: '1D Infinite Potential Well Solutions',
      courseCode: 'PHYS-301',
      courseName: 'Quantum Mechanics',
      difficulty: 'Advanced',
      questionCount: 4,
      estimatedMinutes: 12,
      topic: 'Wave Mechanics',
      description: 'Calculate energy eigenvalues, probability density peaks, and boundary normalization factors for quantum bound states.',
      masteryScore: 64,
      status: 'in-progress',
      isWeakSpot: true,
      isRecommended: true,
      xpReward: 60,
    },
    {
      id: 'vector-flux',
      title: 'Surface Flux & Divergence Theorem',
      courseCode: 'MATH-204',
      courseName: 'Multivariable Calculus',
      difficulty: 'Intermediate',
      questionCount: 5,
      estimatedMinutes: 10,
      topic: 'Vector Calculus',
      description: 'Evaluate net outward volumetric flux across closed parametric surfaces using Gauss’s Divergence Theorem.',
      masteryScore: 75,
      status: 'in-progress',
      isRecommended: true,
      xpReward: 50,
    },
    {
      id: 'membrane-transport',
      title: 'Membrane Transport & Osmotic Gradients',
      courseCode: 'BIO-101',
      courseName: 'Introduction to Biology',
      difficulty: 'Beginner',
      questionCount: 5,
      estimatedMinutes: 7,
      topic: 'Cell Biology',
      description: 'Distinguish facilitated diffusion, primary active transport, and secondary symport/antiport carrier dynamics.',
      masteryScore: 90,
      status: 'mastered',
      isRecommended: false,
      xpReward: 35,
    },
    {
      id: 'uncertainty-principle',
      title: 'Heisenberg Uncertainty & Momentum Operators',
      courseCode: 'PHYS-301',
      courseName: 'Quantum Mechanics',
      difficulty: 'Advanced',
      questionCount: 5,
      estimatedMinutes: 15,
      topic: 'Quantum Principles',
      description: 'Derive minimum uncertainty product bounds and commutator expectation values for non-commuting observables.',
      masteryScore: 50,
      status: 'not-started',
      isWeakSpot: true,
      isRecommended: false,
      xpReward: 60,
    },
  ]);

  readonly filteredDrills = computed(() => {
    const course = this.selectedCourse();
    const cat = this.selectedCategory();
    const diff = this.selectedDifficulty();
    const query = this.searchQuery().toLowerCase().trim();

    return this.drills().filter((d) => {
      const matchCourse = course === 'all' || d.courseCode.toLowerCase().includes(course.toLowerCase());
      const matchDiff = diff === 'all' || d.difficulty.toLowerCase() === diff.toLowerCase();
      
      let matchCat = true;
      if (cat === 'recommended') matchCat = !!d.isRecommended;
      else if (cat === 'weak-spots') matchCat = !!d.isWeakSpot;
      else if (cat === 'completed') matchCat = d.status === 'mastered';

      const matchQuery =
        !query ||
        d.title.toLowerCase().includes(query) ||
        d.courseCode.toLowerCase().includes(query) ||
        d.topic.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query);

      return matchCourse && matchDiff && matchCat && matchQuery;
    });
  });

  setCategory(c: 'all' | 'recommended' | 'weak-spots' | 'completed') {
    this.selectedCategory.set(c);
  }

  clearFilters() {
    this.selectedCourse.set('all');
    this.selectedCategory.set('all');
    this.selectedDifficulty.set('all');
    this.searchQuery.set('');
  }
}
