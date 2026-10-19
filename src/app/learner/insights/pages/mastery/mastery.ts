import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZardDrawerImports } from '@/shared/components/drawer';

export interface StudentOutcomeReport {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  courseCode: string;
  courseName: string;
  module: string;
  score: number; // 1.0 - 4.0 scale
  maxScore: number; // 4.0
  level: 'exceeds' | 'meets' | 'near' | 'well-below';
  levelLabel: string;
  percentage: number;
  evidenceItems: { name: string; score: string; type: string }[];
}

@Component({
  selector: 'app-insights-mastery',
  imports: [RouterLink, FormsModule, ZardDrawerImports],
  templateUrl: './mastery.html',
  styleUrl: './mastery.css',
})
export default class Mastery {
  readonly reportDrawerVisible = signal(false);

  // Filters
  readonly searchQuery = signal('');
  readonly selectedCourse = signal<string>('all');
  readonly selectedLevel = signal<string>('all');

  readonly courses = [
    { code: 'MATH-301', name: 'Advanced Calculus III' },
    { code: 'PHYS-201', name: 'Quantum Mechanics' },
    { code: 'CS-210', name: 'Data Structures & Algorithms' },
    { code: 'CHEM-110', name: 'General Chemistry' },
    { code: 'BIO-105', name: 'Cellular Biology' },
  ];

  readonly studentOutcomes = signal<StudentOutcomeReport[]>([
    // MATH-301
    {
      id: 'out-m1',
      code: 'RC.1.1',
      title: 'Multivariable Limits & Continuity',
      shortTitle: 'Limits & Continuity',
      description: 'Analyze path-dependent limits in ℝ² and evaluate multivariable continuity theorems.',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus III',
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
      id: 'out-m2',
      code: 'RC.1.2',
      title: 'Partial Derivatives & Multivariable Chain Rule',
      shortTitle: 'Partials & Chain Rule',
      description: 'Calculate higher-order partial derivatives and apply matrix chain rules to composite fields.',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus III',
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
      id: 'out-m3',
      code: 'WS.2.1',
      title: 'Directional Derivatives & Gradient Vectors',
      shortTitle: 'Directional Gradients',
      description: 'Determine rates of steepest ascent, orthogonal level sets, and normal vectors in ℝ³.',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus III',
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
      id: 'out-m4',
      code: 'WS.2.2',
      title: 'Constrained Optimization & Lagrange Multipliers',
      shortTitle: 'Lagrange Extrema',
      description: 'Formulate Hessian matrices, classify critical points, and optimize objective functions on boundaries.',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus III',
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
      id: 'out-m5',
      code: 'MI.3.1',
      title: 'Double Integrals in Cartesian & Polar Coordinates',
      shortTitle: 'Double Integrals',
      description: 'Set up iterated double integrals, transform planar domains, and calculate Jacobian determinants.',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus III',
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
      id: 'out-m6',
      code: 'VC.4.1',
      title: 'Vector Fields, Work Integrals & Path Independence',
      shortTitle: 'Vector Fields',
      description: 'Evaluate line integrals along smooth parameterized curves and test vector fields for conservative potential.',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus III',
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
      id: 'out-m7',
      code: 'VC.4.2',
      title: 'Green’s Theorem, Curl, and Surface Circulation',
      shortTitle: 'Green’s Theorem',
      description: 'Relate closed boundary line integrals to double integrals over enclosed planar domains using 2D curl.',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus III',
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

    // PHYS-201
    {
      id: 'out-p1',
      code: 'QP.1.1',
      title: 'Schrödinger Wave Mechanics & Potential Wells',
      shortTitle: 'Wave Mechanics',
      description: 'Solve the 1D time-independent Schrödinger equation for infinite and finite square potential wells.',
      courseCode: 'PHYS-201',
      courseName: 'Quantum Mechanics',
      module: 'Module 1: Wave Equations',
      score: 3.8,
      maxScore: 4.0,
      level: 'exceeds',
      levelLabel: 'Exceeds Mastery',
      percentage: 95,
      evidenceItems: [
        { name: 'Lab Report 1: Potential Wells Simulation', score: '48/50 (96%)', type: 'Lab' },
        { name: 'Quiz 1: Boundary Wave Solutions', score: '19/20 (95%)', type: 'Quiz' },
      ],
    },
    {
      id: 'out-p2',
      code: 'QP.1.2',
      title: 'Wavefunction Normalization & Probability Densities',
      shortTitle: 'Probability Densities',
      description: 'Calculate expectation values, probability densities, and verify Hermitian operator orthogonality.',
      courseCode: 'PHYS-201',
      courseName: 'Quantum Mechanics',
      module: 'Module 1: Wave Equations',
      score: 4.0,
      maxScore: 4.0,
      level: 'exceeds',
      levelLabel: 'Exceeds Mastery',
      percentage: 100,
      evidenceItems: [
        { name: 'Problem Set 2: Hermitian Operators', score: '50/50 (100%)', type: 'Homework' },
        { name: 'Midterm Question 2: Probability Flux', score: '25/25 (100%)', type: 'Exam' },
      ],
    },
    {
      id: 'out-p3',
      code: 'QP.2.1',
      title: 'Harmonic Oscillator Energy Eigenstates',
      shortTitle: 'Harmonic Oscillator',
      description: 'Apply ladder operator algebra (creation and annihilation) to derive ground and excited states.',
      courseCode: 'PHYS-201',
      courseName: 'Quantum Mechanics',
      module: 'Module 2: Quantum States',
      score: 2.9,
      maxScore: 4.0,
      level: 'near',
      levelLabel: 'Near Mastery',
      percentage: 73,
      evidenceItems: [
        { name: 'Quiz 2: Ladder Operators', score: '15/20 (75%)', type: 'Quiz' },
        { name: 'Homework 3: Hermite Polynomials', score: '35/50 (70%)', type: 'Homework' },
      ],
    },
    {
      id: 'out-p4',
      code: 'QP.2.2',
      title: 'Angular Momentum & Spherical Harmonics',
      shortTitle: 'Angular Momentum',
      description: 'Deconstruct central force problems using spherical harmonics and orbital angular momentum commutation relations.',
      courseCode: 'PHYS-201',
      courseName: 'Quantum Mechanics',
      module: 'Module 2: Quantum States',
      score: 3.3,
      maxScore: 4.0,
      level: 'meets',
      levelLabel: 'Meets Mastery',
      percentage: 83,
      evidenceItems: [
        { name: 'Problem Set 4: Spherical Harmonics', score: '42/50 (84%)', type: 'Homework' },
      ],
    },

    // CS-210
    {
      id: 'out-cs1',
      code: 'DSA.1.1',
      title: 'Self-Balancing Trees (AVL & Red-Black Invariants)',
      shortTitle: 'Balanced Trees',
      description: 'Implement tree rotation algorithms, maintain height balance factors, and prove logarithmic search complexity.',
      courseCode: 'CS-210',
      courseName: 'Data Structures & Algorithms',
      module: 'Module 1: Advanced Trees',
      score: 4.0,
      maxScore: 4.0,
      level: 'exceeds',
      levelLabel: 'Exceeds Mastery',
      percentage: 100,
      evidenceItems: [
        { name: 'Programming Assignment 1: AVL Tree Implementation', score: '100/100 (100%)', type: 'Project' },
        { name: 'Quiz: Tree Rotations', score: '20/20 (100%)', type: 'Quiz' },
      ],
    },
    {
      id: 'out-cs2',
      code: 'DSA.1.2',
      title: 'Graph Traversal & Shortest Path Algorithms',
      shortTitle: 'Graph Traversal',
      description: 'Formulate Dijkstra, Bellman-Ford, and topological sort algorithms on directed acyclic networks.',
      courseCode: 'CS-210',
      courseName: 'Data Structures & Algorithms',
      module: 'Module 2: Graph Theory',
      score: 3.6,
      maxScore: 4.0,
      level: 'meets',
      levelLabel: 'Meets Mastery',
      percentage: 90,
      evidenceItems: [
        { name: 'Coding Lab 3: Priority Queue Dijkstra', score: '45/50 (90%)', type: 'Lab' },
        { name: 'Midterm Exam: Graph Theory', score: '27/30 (90%)', type: 'Exam' },
      ],
    },
    {
      id: 'out-cs3',
      code: 'DSA.2.1',
      title: 'Dynamic Programming & Memoization Recurrences',
      shortTitle: 'Dynamic Programming',
      description: 'Design optimal substructure recurrences, tabular memoization, and reconstruct optimal sequence alignments.',
      courseCode: 'CS-210',
      courseName: 'Data Structures & Algorithms',
      module: 'Module 3: Algorithm Strategies',
      score: 2.7,
      maxScore: 4.0,
      level: 'near',
      levelLabel: 'Near Mastery',
      percentage: 68,
      evidenceItems: [
        { name: 'Homework 4: Knapsack & Edit Distance', score: '34/50 (68%)', type: 'Homework' },
        { name: 'Practice Drill: Top-Down Memoization', score: '7/10 (70%)', type: 'Practice' },
      ],
    },

    // CHEM-110
    {
      id: 'out-ch1',
      code: 'CHEM.1.1',
      title: 'Chemical Equilibrium & Le Chatelier Principles',
      shortTitle: 'Equilibrium',
      description: 'Compute reaction quotients, predict stress responses, and calculate temperature-dependent equilibrium constants.',
      courseCode: 'CHEM-110',
      courseName: 'General Chemistry',
      module: 'Module 1: Reaction Equilibria',
      score: 3.9,
      maxScore: 4.0,
      level: 'exceeds',
      levelLabel: 'Exceeds Mastery',
      percentage: 98,
      evidenceItems: [
        { name: 'Experiment 2: Spectrophotometric Equilibrium', score: '49/50 (98%)', type: 'Lab' },
        { name: 'Quiz: Equilibrium Shifts', score: '20/20 (100%)', type: 'Quiz' },
      ],
    },
    {
      id: 'out-ch2',
      code: 'CHEM.1.2',
      title: 'Thermodynamics & Gibbs Free Energy',
      shortTitle: 'Thermodynamics',
      description: 'Evaluate enthalpy, entropy changes, and spontaneous driving forces across non-standard reaction conditions.',
      courseCode: 'CHEM-110',
      courseName: 'General Chemistry',
      module: 'Module 2: Thermodynamics',
      score: 3.4,
      maxScore: 4.0,
      level: 'meets',
      levelLabel: 'Meets Mastery',
      percentage: 85,
      evidenceItems: [
        { name: 'Problem Set 3: Free Energy Cycles', score: '43/50 (86%)', type: 'Homework' },
      ],
    },

    // BIO-105
    {
      id: 'out-b1',
      code: 'BIO.1.1',
      title: 'Cellular Respiration & Krebs Cycle Electron Transport',
      shortTitle: 'Cellular Respiration',
      description: 'Map ATP yield through oxidative phosphorylation, chemiosmotic proton gradients, and respiratory complexes.',
      courseCode: 'BIO-105',
      courseName: 'Cellular Biology',
      module: 'Module 1: Cellular Metabolism',
      score: 3.5,
      maxScore: 4.0,
      level: 'meets',
      levelLabel: 'Meets Mastery',
      percentage: 88,
      evidenceItems: [
        { name: 'Lab 4: Mitochondrial Respiration Assay', score: '44/50 (88%)', type: 'Lab' },
        { name: 'Unit Quiz: Oxidative Phosphorylation', score: '18/20 (90%)', type: 'Quiz' },
      ],
    },
    {
      id: 'out-b2',
      code: 'BIO.1.2',
      title: 'Gene Expression & Transcription Regulation',
      shortTitle: 'Gene Expression',
      description: 'Analyze promoter binding affinities, epigenetic chromatin remodeling, and transcription factor cascades.',
      courseCode: 'BIO-105',
      courseName: 'Cellular Biology',
      module: 'Module 2: Molecular Genetics',
      score: 3.2,
      maxScore: 4.0,
      level: 'meets',
      levelLabel: 'Meets Mastery',
      percentage: 80,
      evidenceItems: [
        { name: 'Assignment 2: Operon Modeling', score: '40/50 (80%)', type: 'Homework' },
      ],
    },
  ]);

  // Dynamic Bento Analytics (reacts to course selection)
  readonly analytics = computed(() => {
    const course = this.selectedCourse();
    const outcomes = course === 'all'
      ? this.studentOutcomes()
      : this.studentOutcomes().filter(o => o.courseCode === course);

    const total = outcomes.length || 1;
    const exceeds = outcomes.filter(o => o.level === 'exceeds').length;
    const meets = outcomes.filter(o => o.level === 'meets').length;
    const near = outcomes.filter(o => o.level === 'near').length;
    const wellBelow = outcomes.filter(o => o.level === 'well-below').length;

    const avgScore = outcomes.length
      ? (outcomes.reduce((acc, o) => acc + o.score, 0) / outcomes.length).toFixed(1)
      : '0.0';

    return {
      overallScore: avgScore,
      maxScore: '4.0',
      totalCount: outcomes.length,
      masteredCount: exceeds + meets,
      exceedsPercent: `${Math.round((exceeds / total) * 100)}%`,
      exceedsCount: exceeds,
      meetsPercent: `${Math.round((meets / total) * 100)}%`,
      meetsCount: meets,
      nearPercent: `${Math.round((near / total) * 100)}%`,
      nearCount: near,
      wellBelowPercent: `${Math.round((wellBelow / total) * 100)}%`,
      wellBelowCount: wellBelow,
    };
  });

  readonly filteredOutcomes = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const course = this.selectedCourse();
    const lvl = this.selectedLevel();

    return this.studentOutcomes().filter(o => {
      if (course !== 'all' && o.courseCode !== course) {
        return false;
      }
      if (lvl !== 'all' && o.level !== lvl) {
        return false;
      }
      if (q) {
        const matchesQuery =
          o.title.toLowerCase().includes(q) ||
          o.code.toLowerCase().includes(q) ||
          o.courseCode.toLowerCase().includes(q) ||
          o.courseName.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }
      return true;
    });
  });

  setLevelFilter(level: string): void {
    this.selectedLevel.set(level);
  }

  openReportDrawer(): void {
    this.reportDrawerVisible.set(true);
  }

  closeReportDrawer(): void {
    this.reportDrawerVisible.set(false);
  }
}
