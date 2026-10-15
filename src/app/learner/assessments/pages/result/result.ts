import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

export interface ResultOption {
  id: string;
  label: string;
  text: string;
}

export interface QuestionReviewItem {
  id: string;
  number: number;
  stem: string;
  pointsEarned: number;
  maxPoints: number;
  isCorrect: boolean;
  selectedOptionId: string;
  correctOptionId: string;
  explanation: string;
  rubricCriterion: string;
  teacherNote?: string;
  options: ResultOption[];
}

@Component({
  imports: [RouterLink],
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export default class Result implements OnInit {
  private route = inject(ActivatedRoute);

  readonly assessmentId = signal('math301-midterm');
  readonly examTitle = signal('Multivariable Calculus Midterm Examination');
  readonly courseCode = signal('MATH-301');
  readonly courseName = signal('Advanced Calculus & Analytical Geometry');

  // Overall Score Metrics
  readonly score = signal(46);
  readonly maxScore = signal(50);
  readonly percentage = computed(() => Math.round((this.score() / this.maxScore()) * 100));
  readonly letterGrade = signal('A');
  readonly classAverage = signal(77.4);
  readonly percentile = signal(94);
  readonly timeSpent = signal('1h 14m');
  readonly maxDuration = signal('1h 30m');
  readonly submittedDate = signal('Oct 15, 2026 · 2:24 AM');

  readonly instructorName = signal('Prof. Jonathan Hayes');
  readonly instructorFeedback = signal(
    'Strong analytical grasp of surface flux theorems, double integrals, and constrained optimization. Outstanding precision on Green’s theorem and partial derivatives. Review divergence coordinate volume integration on question 6 for minor arithmetic slip.'
  );

  // Review Filter
  readonly activeFilter = signal<'all' | 'correct' | 'incorrect'>('all');

  readonly questions = signal<QuestionReviewItem[]>([
    {
      id: 'q1',
      number: 1,
      pointsEarned: 5,
      maxPoints: 5,
      isCorrect: true,
      selectedOptionId: 'opt_1b',
      correctOptionId: 'opt_1b',
      rubricCriterion: 'Double Integration Over Rectangular Domains',
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Evaluate the double integral ∬<sub>R</sub> (2x + 4y) dA over the rectangular region R = [0, 2] × [0, 3].</p>',
      explanation: 'Integrating with respect to y first yields ∫₀² [2xy + 2y²]₀³ dx = ∫₀² (6x + 18) dx = [3x² + 18x]₀² = 12 + 36 = 48. Notice that Fubini’s theorem applies smoothly across both coordinate orders.',
      teacherNote: 'Flawless execution of iterated limits and antiderivatives.',
      options: [
        { id: 'opt_1a', label: 'A', text: '48' },
        { id: 'opt_1b', label: 'B', text: '60' },
        { id: 'opt_1c', label: 'C', text: '72' },
        { id: 'opt_1d', label: 'D', text: '36' },
      ],
    },
    {
      id: 'q2',
      number: 2,
      pointsEarned: 5,
      maxPoints: 5,
      isCorrect: true,
      selectedOptionId: 'opt_2c',
      correctOptionId: 'opt_2c',
      rubricCriterion: 'Mixed Partial Derivatives & Clairaut’s Theorem',
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Let <i>f(x, y)</i> = x³ y² - 4xy + 7. Compute the second-order mixed partial derivative ∂²f / (∂y ∂x).</p>',
      explanation: 'First, ∂f/∂x = 3x² y² - 4y. Then, differentiating with respect to y: ∂/∂y(3x² y² - 4y) = 6x² y - 4.',
      options: [
        { id: 'opt_2a', label: 'A', text: '6xy - 4' },
        { id: 'opt_2b', label: 'B', text: '3x² y - 4' },
        { id: 'opt_2c', label: 'C', text: '6x² y - 4' },
        { id: 'opt_2d', label: 'D', text: '2x³ - 4' },
      ],
    },
    {
      id: 'q3',
      number: 3,
      pointsEarned: 5,
      maxPoints: 5,
      isCorrect: true,
      selectedOptionId: 'opt_3a',
      correctOptionId: 'opt_3a',
      rubricCriterion: 'Gradient Vectors of Scalar Fields',
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Determine the gradient vector ∇f(1, -1) for the scalar field <i>f(x, y)</i> = 3x² y + 2y³.</p>',
      explanation: '∂f/∂x = 6xy, ∂f/∂y = 3x² + 6y². At (1, -1): ∂f/∂x = 6(1)(-1) = -6; ∂f/∂y = 3(1)² + 6(-1)² = 3 + 6 = 9. Hence ∇f(1, -1) = ⟨ -6, 9 ⟩.',
      options: [
        { id: 'opt_3a', label: 'A', text: '⟨ -6, 9 ⟩' },
        { id: 'opt_3b', label: 'B', text: '⟨ -6, 3 ⟩' },
        { id: 'opt_3c', label: 'C', text: '⟨ 6, 9 ⟩' },
        { id: 'opt_3d', label: 'D', text: '⟨ 3, -6 ⟩' },
      ],
    },
    {
      id: 'q4',
      number: 4,
      pointsEarned: 5,
      maxPoints: 5,
      isCorrect: true,
      selectedOptionId: 'opt_4d',
      correctOptionId: 'opt_4d',
      rubricCriterion: 'Directional Derivatives & Maximum Rate of Change',
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Compute the maximum rate of change of <i>f(x, y, z)</i> = x² y z³ at the point P(2, 1, 1).</p>',
      explanation: 'The maximum rate of change equals ||∇f(P)||. ∇f = ⟨ 2xyz³, x² z³, 3x² y z² ⟩. At (2, 1, 1): ∇f(P) = ⟨ 4, 4, 12 ⟩. Magnitude = √(4² + 4² + 12²) = √(16 + 16 + 144) = √176.',
      options: [
        { id: 'opt_4a', label: 'A', text: '√80' },
        { id: 'opt_4b', label: 'B', text: '√160' },
        { id: 'opt_4c', label: 'C', text: '12' },
        { id: 'opt_4d', label: 'D', text: '√176' },
      ],
    },
    {
      id: 'q5',
      number: 5,
      pointsEarned: 5,
      maxPoints: 5,
      isCorrect: true,
      selectedOptionId: 'opt_5a',
      correctOptionId: 'opt_5a',
      rubricCriterion: 'Constrained Optimization & Lagrange Multipliers',
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Apply the method of Lagrange multipliers to maximize <i>f(x, y)</i> = xy subject to the constraint x² + y² = 8. Determine the maximum value of <i>f</i>.</p>',
      explanation: '∇f = λ∇g gives y = 2λx and x = 2λy. Dividing yields y/x = x/y => y² = x². Substituting into x² + y² = 8 gives 2x² = 8 => x = ±2, y = ±2. For maximum f, choose x = 2, y = 2 => f(2, 2) = 4.',
      options: [
        { id: 'opt_5a', label: 'A', text: '4' },
        { id: 'opt_5b', label: 'B', text: '8' },
        { id: 'opt_5c', label: 'C', text: '2√2' },
        { id: 'opt_5d', label: 'D', text: '16' },
      ],
    },
    {
      id: 'q6',
      number: 6,
      pointsEarned: 1,
      maxPoints: 5,
      isCorrect: false,
      selectedOptionId: 'opt_6b',
      correctOptionId: 'opt_6a',
      rubricCriterion: 'Divergence Theorem on Closed Surfaces',
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Using the Divergence Theorem, evaluate the outward flux of <b>F</b> = ⟨ 2x, 3y, z ⟩ across the boundary of the unit ball x² + y² + z² ≤ 1.</p>',
      explanation: 'div(F) = 2 + 3 + 1 = 6. Flux = ∭_E 6 dV = 6 * Vol(Unit Ball) = 6 * (4/3 π * 1³) = 8π.',
      teacherNote: 'Partial credit awarded for computing div(F) = 6 correctly. You multiplied by π instead of the full sphere volume (4/3)π.',
      options: [
        { id: 'opt_6a', label: 'A', text: '8π' },
        { id: 'opt_6b', label: 'B', text: '6π' },
        { id: 'opt_6c', label: 'C', text: '4π' },
        { id: 'opt_6d', label: 'D', text: '2π' },
      ],
    },
    {
      id: 'q7',
      number: 7,
      pointsEarned: 5,
      maxPoints: 5,
      isCorrect: true,
      selectedOptionId: 'opt_7a',
      correctOptionId: 'opt_7a',
      rubricCriterion: 'Scalar Potential of Conservative Vector Fields',
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">A vector field <b>F</b> = ⟨ 2xy + z, x² + 3y², x ⟩ is conservative. Determine the potential function ϕ(x, y, z) satisfying ∇ϕ = <b>F</b> with ϕ(0,0,0) = 0.</p>',
      explanation: 'Integrating ∂ϕ/∂x = 2xy + z gives ϕ = x²y + xz + g(y,z). ∂ϕ/∂y = x² + g_y = x² + 3y² => g(y,z) = y³ + h(z). ∂ϕ/∂z = x + h’(z) = x => h’(z) = 0. Therefore, ϕ(x, y, z) = x² y + y³ + xz.',
      options: [
        { id: 'opt_7a', label: 'A', text: 'ϕ(x, y, z) = x² y + y³ + xz' },
        { id: 'opt_7b', label: 'B', text: 'ϕ(x, y, z) = 2x² y + 3y³ + xz' },
        { id: 'opt_7c', label: 'C', text: 'ϕ(x, y, z) = x² y + y³ - xz' },
        { id: 'opt_7d', label: 'D', text: 'ϕ(x, y, z) = x² y² + xz' },
      ],
    },
    {
      id: 'q8',
      number: 8,
      pointsEarned: 5,
      maxPoints: 5,
      isCorrect: true,
      selectedOptionId: 'opt_8a',
      correctOptionId: 'opt_8a',
      rubricCriterion: 'Green’s Theorem on Boundary Integrals',
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Apply Green’s Theorem to compute the counterclockwise boundary line integral ∮<sub>C</sub> (y² dx + 3xy dy) around the unit square [0, 1] × [0, 1].</p>',
      explanation: 'By Green’s Theorem, ∮_C (P dx + Q dy) = ∬_D (∂Q/∂x - ∂P/∂y) dA. Here ∂Q/∂x = 3y and ∂P/∂y = 2y. So ∬_D (3y - 2y) dA = ∫₀¹ ∫₀¹ y dy dx = ∫₀¹ [y²/2]₀¹ dx = 1/2.',
      options: [
        { id: 'opt_8a', label: 'A', text: '1/2' },
        { id: 'opt_8b', label: 'B', text: '1' },
        { id: 'opt_8c', label: 'C', text: '3/2' },
        { id: 'opt_8d', label: 'D', text: '2' },
      ],
    },
    {
      id: 'q9',
      number: 9,
      pointsEarned: 5,
      maxPoints: 5,
      isCorrect: true,
      selectedOptionId: 'opt_9d',
      correctOptionId: 'opt_9d',
      rubricCriterion: 'Parametric Surface Area & Plane Intercepts',
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Determine the surface area of the portion of the plane 2x + 2y + z = 6 that lies within the first octant.</p>',
      explanation: 'z = 6 - 2x - 2y. Area = ∬_D √(1 + (-2)² + (-2)²) dA = 3 * Area(D). In the xy-plane, the boundary is 2x + 2y = 6 or x + y = 3 with intercepts at (3, 0) and (0, 3). The triangular area is (1/2)(3)(3) = 9/2. Multiplying by 3 gives 27/2.',
      options: [
        { id: 'opt_9a', label: 'A', text: '9' },
        { id: 'opt_9b', label: 'B', text: '27/2' },
        { id: 'opt_9c', label: 'C', text: '18' },
        { id: 'opt_9d', label: 'D', text: '27' },
      ],
    },
    {
      id: 'q10',
      number: 10,
      pointsEarned: 5,
      maxPoints: 5,
      isCorrect: true,
      selectedOptionId: 'opt_10a',
      correctOptionId: 'opt_10a',
      rubricCriterion: 'Jacobian Determinants for Coordinate Transformations',
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Compute the Jacobian determinant ∂(x, y) / ∂(u, v) for the coordinate transformation x = u² - v², y = 2uv.</p>',
      explanation: '∂x/∂u = 2u, ∂x/∂v = -2v, ∂y/∂u = 2v, ∂y/∂v = 2u. J = (2u)(2u) - (-2v)(2v) = 4u² + 4v² = 4(u² + v²).',
      options: [
        { id: 'opt_10a', label: 'A', text: '4(u² + v²)' },
        { id: 'opt_10b', label: 'B', text: '2(u² + v²)' },
        { id: 'opt_10c', label: 'C', text: '4(u² - v²)' },
        { id: 'opt_10d', label: 'D', text: '4uv' },
      ],
    },
  ]);

  readonly totalQuestionsCount = computed(() => this.questions().length);
  readonly correctQuestionsCount = computed(() => this.questions().filter(q => q.isCorrect).length);
  readonly incorrectQuestionsCount = computed(() => this.questions().filter(q => !q.isCorrect).length);

  readonly filteredQuestions = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'correct') {
      return this.questions().filter(q => q.isCorrect);
    }
    if (filter === 'incorrect') {
      return this.questions().filter(q => !q.isCorrect);
    }
    return this.questions();
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.assessmentId.set(id);
    }
  }
}
