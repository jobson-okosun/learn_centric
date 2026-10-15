import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports } from '@/shared/components/drawer';

export interface StudentOutcomeReport {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  module: string;
  score: number;
  maxScore: number;
  level: 'exceeds' | 'meets' | 'near' | 'well-below';
  levelLabel: string;
  percentage: number;
  evidenceItems: { name: string; score: string; type: string }[];
}

@Component({
  imports: [FormsModule, ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports],
  selector: 'app-mastery',
  styleUrl: './mastery.css',
  templateUrl: './mastery.html',
})
export default class Mastery {
  readonly reportDrawerVisible = signal(false);

  // Search & filter state
  readonly searchQuery = signal('');
  readonly selectedLevel = signal<string>('all');
  readonly selectedModule = signal<string>('all');

  // Student's Personal Mastery Analytics (Tutor's 4 Mastery Tiers for Alex Morgan)
  readonly analytics = signal({
    overallScore: '3.8',
    maxScore: '4.0',
    masteredCount: 7,
    totalCount: 8,
    exceedsPercent: '38%',
    exceedsCount: 3,
    meetsPercent: '50%',
    meetsCount: 4,
    nearPercent: '12%',
    nearCount: 1,
    wellBelowPercent: '0%',
    wellBelowCount: 0,
  });

  readonly modules = [
    'Module 1: Multivariable Functions',
    'Module 2: Partial Derivatives',
    'Module 3: Multiple Integrals',
    'Module 4: Vector Calculus',
  ];

  // The Student's Individual Learning Outcomes
  readonly studentOutcomes = signal<StudentOutcomeReport[]>([
    {
      id: 'out-1',
      code: 'RC.1.1',
      title: 'Multivariable Limits & Continuity',
      shortTitle: 'Limits & Continuity',
      description: 'Analyze path-dependent limits in ℝ² and evaluate multivariable continuity theorems.',
      module: 'Module 1: Multivariable Functions',
      score: 4.0,
      maxScore: 4.0,
      level: 'exceeds',
      levelLabel: 'Exceeds Mastery',
      percentage: 100,
      evidenceItems: [
        { name: 'Problem Set 1.1: Surface Projections', score: '50/50 (100%)', type: 'Homework' },
        { name: 'Concept Check: Topological Disks', score: '10/10 (100%)', type: 'Practice' },
      ],
    },
    {
      id: 'out-2',
      code: 'RC.1.2',
      title: 'Partial Derivatives & Multivariable Chain Rule',
      shortTitle: 'Partials & Chain Rule',
      description: 'Calculate higher-order partial derivatives and apply matrix chain rules to composite fields.',
      module: 'Module 2: Partial Derivatives',
      score: 3.8,
      maxScore: 4.0,
      level: 'exceeds',
      levelLabel: 'Exceeds Mastery',
      percentage: 95,
      evidenceItems: [
        { name: 'Quiz 1: Partial Differentiation Basics', score: '24/25 (96%)', type: 'Quiz' },
        { name: 'Written Exercise: Matrix Chains', score: '48/50 (96%)', type: 'Homework' },
      ],
    },
    {
      id: 'out-3',
      code: 'WS.2.1',
      title: 'Directional Derivatives & Gradient Vectors',
      shortTitle: 'Directional Gradients',
      description: 'Determine rates of steepest ascent, orthogonal level sets, and normal vectors in ℝ³.',
      module: 'Module 2: Partial Derivatives',
      score: 3.9,
      maxScore: 4.0,
      level: 'exceeds',
      levelLabel: 'Exceeds Mastery',
      percentage: 98,
      evidenceItems: [
        { name: 'Quiz 2: Tangent Planes & Gradients', score: '25/25 (100%)', type: 'Quiz' },
        { name: 'Formative Drill: Steepest Descent Vectors', score: '10/10 (100%)', type: 'Practice' },
      ],
    },
    {
      id: 'out-4',
      code: 'WS.2.2',
      title: 'Constrained Optimization & Lagrange Multipliers',
      shortTitle: 'Lagrange Extrema',
      description: 'Formulate Hessian matrices, classify critical points, and optimize objective functions on boundaries.',
      module: 'Module 2: Partial Derivatives',
      score: 3.5,
      maxScore: 4.0,
      level: 'meets',
      levelLabel: 'Meets Mastery',
      percentage: 88,
      evidenceItems: [
        { name: 'Written Exercise 2: Extreme Values', score: '48/50 (96%)', type: 'Homework' },
        { name: 'Midterm 1: Lagrange Section', score: '22/25 (88%)', type: 'Exam' },
      ],
    },
    {
      id: 'out-5',
      code: 'MI.3.1',
      title: 'Double Integrals in Cartesian & Polar Coordinates',
      shortTitle: 'Double Integrals',
      description: 'Set up iterated double integrals, transform planar domains, and calculate Jacobian determinants.',
      module: 'Module 3: Multiple Integrals',
      score: 3.7,
      maxScore: 4.0,
      level: 'meets',
      levelLabel: 'Meets Mastery',
      percentage: 93,
      evidenceItems: [
        { name: 'Problem Set 2: Polar Integrals', score: '47/50 (94%)', type: 'Homework' },
        { name: 'Quiz: Area & Centroids', score: '19/20 (95%)', type: 'Quiz' },
      ],
    },
    {
      id: 'out-6',
      code: 'MI.3.2',
      title: 'Triple Integrals in Cylindrical & Spherical Bounds',
      shortTitle: 'Triple Integrals',
      description: 'Model volume, mass density distributions, and moments of inertia using 3D transformations.',
      module: 'Module 3: Multiple Integrals',
      score: 3.4,
      maxScore: 4.0,
      level: 'meets',
      levelLabel: 'Meets Mastery',
      percentage: 85,
      evidenceItems: [
        { name: 'Problem Set 2.3: Spherical Coordinates', score: '43/50 (86%)', type: 'Homework' },
        { name: 'Check-in: Triple Integrals', score: '17/20 (85%)', type: 'Quiz' },
      ],
    },
    {
      id: 'out-7',
      code: 'VC.4.1',
      title: 'Vector Fields, Work Integrals & Path Independence',
      shortTitle: 'Vector Fields',
      description: 'Evaluate line integrals along smooth parameterized curves and test vector fields for conservative potential.',
      module: 'Module 4: Vector Calculus',
      score: 3.2,
      maxScore: 4.0,
      level: 'meets',
      levelLabel: 'Meets Mastery',
      percentage: 80,
      evidenceItems: [
        { name: 'Formative Drill: Line Integrals along Curves', score: '16/20 (80%)', type: 'Practice' },
        { name: 'Midterm 1: Vector Fields Section', score: '20/25 (80%)', type: 'Exam' },
      ],
    },
    {
      id: 'out-8',
      code: 'VC.4.2',
      title: 'Green’s Theorem, Curl, and Surface Circulation',
      shortTitle: 'Green’s Theorem',
      description: 'Relate closed boundary line integrals to double integrals over enclosed planar domains using 2D curl.',
      module: 'Module 4: Vector Calculus',
      score: 2.8,
      maxScore: 4.0,
      level: 'near',
      levelLabel: 'Near Mastery',
      percentage: 70,
      evidenceItems: [
        { name: 'Quiz: Circulation & Flux on Boundaries', score: '14/20 (70%)', type: 'Quiz' },
      ],
    },
  ]);

  readonly filteredOutcomes = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const lvl = this.selectedLevel();
    const mod = this.selectedModule();

    return this.studentOutcomes().filter(o => {
      if (q && !o.title.toLowerCase().includes(q) && !o.code.toLowerCase().includes(q) && !o.description.toLowerCase().includes(q)) {
        return false;
      }
      if (lvl !== 'all' && o.level !== lvl) {
        return false;
      }
      if (mod !== 'all' && o.module !== mod) {
        return false;
      }
      return true;
    });
  });

  openReportDrawer() {
    this.reportDrawerVisible.set(true);
  }

  closeReportDrawer() {
    this.reportDrawerVisible.set(false);
  }
}
