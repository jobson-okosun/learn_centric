import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface DrillQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface DrillQuestion {
  id: string;
  type: string;
  stem: string;
  points: number;
  options: DrillQuestionOption[];
  hints: string[];
  explanation: {
    concept: string;
    steps: string[];
    takeaway: string;
  };
}

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-practice-runner',
  styleUrl: './runner.css',
  templateUrl: './runner.html',
})
export default class Runner {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly drillId = signal<string>(this.route.snapshot.paramMap.get('id') || 'stokes-theorem');
  readonly drillTitle = signal('Stokes’ Theorem & Boundary Circulation');
  readonly courseCode = signal('MATH-204');
  readonly courseName = signal('Multivariable Calculus');

  readonly questions = signal<DrillQuestion[]>([
    {
      id: 'q-1',
      type: 'Multiple Choice',
      points: 1,
      stem: 'Let S be the upper hemisphere x² + y² + z² = 1, z ≥ 0, oriented with upward unit normal vector n. The boundary curve C is the unit circle in the xy-plane oriented counterclockwise when viewed from above. According to Stokes’ Theorem, for any smooth vector field F: ∮_C F · dr = ∬_S (∇ × F) · dS',
      options: [
        { id: 'opt1', text: 'The circulation around C depends entirely on the specific surface S capping C.', isCorrect: false },
        { id: 'opt2', text: 'The flux of curl(F) is identical across any smooth orientable surface capping C with matching boundary orientation.', isCorrect: true },
        { id: 'opt3', text: 'Stokes’ Theorem only holds if div(F) = 0 everywhere in ℝ³.', isCorrect: false },
        { id: 'opt4', text: 'The line integral vanishes because the upper hemisphere is closed.', isCorrect: false },
      ],
      hints: [
        'Recall that Stokes’ Theorem equates the boundary circulation to the surface integral of the curl.',
        'Does the choice of capping surface matter as long as they share the exact same oriented boundary curve C?',
      ],
      explanation: {
        concept: 'Surface Independence of Curl Flux',
        steps: [
          'Stokes’ Theorem states that ∮_C F · dr = ∬_S (∇ × F) · dS.',
          'Notice the left-hand side depends ONLY on the boundary curve C and the vector field F.',
          'Therefore, if S₁ and S₂ are two different smooth orientable surfaces that share the exact same boundary curve C with matching orientation, ∬_S₁ (∇ × F) · dS = ∬_S₂ (∇ × F) · dS.',
        ],
        takeaway: 'Curl flux across an open surface depends only on the values of F along its boundary contour.',
      },
    },
    {
      id: 'q-2',
      type: 'Multiple Choice',
      points: 1,
      stem: 'Given the vector field F = ⟨-y, x, z²⟩ and the boundary circle C: r(t) = ⟨cos t, sin t, 0⟩ for 0 ≤ t ≤ 2π. What is the value of the circulation ∮_C F · dr?',
      options: [
        { id: 'opt1', text: '0', isCorrect: false },
        { id: 'opt2', text: 'π', isCorrect: false },
        { id: 'opt3', text: '2π', isCorrect: true },
        { id: 'opt4', text: '-2π', isCorrect: false },
      ],
      hints: [
        'Calculate curl(F) first, or directly parameterize F(r(t)) · r’(t) dt.',
        'curl(F) = ⟨0, 0, 1 - (-1)⟩ = ⟨0, 0, 2⟩. The unit disc has area π.',
      ],
      explanation: {
        concept: 'Evaluating Circulation via Stokes’ Theorem',
        steps: [
          'Compute curl(F): ∇ × F = ⟨∂z²/∂y - ∂x/∂z, ∂(-y)/∂z - ∂z²/∂x, ∂x/∂x - ∂(-y)/∂y⟩ = ⟨0, 0, 1 - (-1)⟩ = ⟨0, 0, 2⟩.',
          'Choose the simplest surface S: the flat unit disk x² + y² ≤ 1 with z = 0 and normal n = k = ⟨0, 0, 1⟩.',
          '∬_S (∇ × F) · dS = ∬_S ⟨0, 0, 2⟩ · ⟨0, 0, 1⟩ dA = 2 ∬_S dA = 2 · (π · 1²) = 2π.',
        ],
        takeaway: 'Choosing the flat disk capping surface simplifies the calculation over integrating the hemisphere directly.',
      },
    },
    {
      id: 'q-3',
      type: 'Multiple Choice',
      points: 1,
      stem: 'What happens to the sign of the circulation ∮_C F · dr if the normal vector n to surface S is flipped from upward to downward?',
      options: [
        { id: 'opt1', text: 'The sign remains positive because circulation is a scalar magnitude.', isCorrect: false },
        { id: 'opt2', text: 'The induced boundary orientation reverses by the right-hand rule, multiplying the line integral by -1.', isCorrect: true },
        { id: 'opt3', text: 'The integral evaluates to zero because normal vectors cancel.', isCorrect: false },
        { id: 'opt4', text: 'The result is undefined without specifying Cartesian coordinates.', isCorrect: false },
      ],
      hints: [
        'Think about the right-hand rule: thumb along normal vector n, curled fingers give boundary orientation.',
      ],
      explanation: {
        concept: 'Right-Hand Rule Orientation Consistency',
        steps: [
          'The orientation of C is induced by the orientation of S according to the right-hand rule.',
          'Flipping n to -n reverses the traversal direction of C.',
          'Since ∮_{-C} F · dr = - ∮_C F · dr, the sign flips.',
        ],
        takeaway: 'Always verify normal vector orientation with the right-hand rule before calculating surface integrals.',
      },
    },
    {
      id: 'q-4',
      type: 'Multiple Choice',
      points: 1,
      stem: 'If S is a closed surface (such as an entire sphere with no boundary hole), what is the value of ∬_S (∇ × F) · dS for any smooth vector field F?',
      options: [
        { id: 'opt1', text: '4π', isCorrect: false },
        { id: 'opt2', text: 'Equal to the volume enclosed by S.', isCorrect: false },
        { id: 'opt3', text: 'Always 0.', isCorrect: true },
        { id: 'opt4', text: 'Dependent on the charge density inside S.', isCorrect: false },
      ],
      hints: [
        'A closed surface can be split into two surfaces sharing the same boundary with opposite orientations, or use the Divergence Theorem on div(curl F).',
      ],
      explanation: {
        concept: 'Flux of a Curl Across Any Closed Surface',
        steps: [
          'By the Divergence Theorem, ∬_S (∇ × F) · dS = ∭_V div(curl F) dV.',
          'The identity div(curl F) = ∇ · (∇ × F) = 0 holds identically for every C² vector field.',
          'Therefore, the integral is identically 0.',
        ],
        takeaway: 'The total flux of any curl field across any closed surface is always zero.',
      },
    },
    {
      id: 'q-5',
      type: 'Multiple Choice',
      points: 1,
      stem: 'Which condition ensures that a vector field F is conservative in a simply connected 3D region D?',
      options: [
        { id: 'opt1', text: '∇ × F = 0 everywhere in D.', isCorrect: true },
        { id: 'opt2', text: '∇ · F = 0 everywhere in D.', isCorrect: false },
        { id: 'opt3', text: 'F · dr > 0 for all paths.', isCorrect: false },
        { id: 'opt4', text: 'The boundary of D is convex.', isCorrect: false },
      ],
      hints: [
        'A conservative vector field has path-independent line integrals and zero circulation along any closed loop.',
      ],
      explanation: {
        concept: 'Irrotational Fields in Simply Connected Domains',
        steps: [
          'If curl(F) = 0 everywhere in simply connected D, then by Stokes’ Theorem, circulation around any closed loop is zero.',
          'Zero circulation implies path independence, which proves F = ∇f for a potential function f.',
        ],
        takeaway: 'curl(F) = 0 on a simply connected domain guarantees F is conservative.',
      },
    },
  ]);

  readonly currentIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly submittedAnswer = signal<boolean>(false);
  readonly revealedHintsCount = signal(0);
  readonly completedDrill = signal(false);

  // Tracking per question: questionId -> { selectedId, isCorrect }
  readonly questionResults = signal<Record<string, { selectedId: string; isCorrect: boolean }>>({});

  readonly currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  readonly totalQuestions = computed(() => this.questions().length);

  readonly correctCount = computed(() => {
    const results = this.questionResults();
    return Object.values(results).filter((r) => r.isCorrect).length;
  });

  readonly accuracyPercentage = computed(() => {
    const total = this.totalQuestions();
    if (total === 0) return 0;
    return Math.round((this.correctCount() / total) * 100);
  });

  readonly progressPercentage = computed(() => {
    return Math.round(((this.currentIndex() + 1) / this.totalQuestions()) * 100);
  });

  selectOption(id: string) {
    if (this.submittedAnswer()) return; // lock once checked
    this.selectedOptionId.set(id);
  }

  revealNextHint() {
    const currentQ = this.currentQuestion();
    if (this.revealedHintsCount() < currentQ.hints.length) {
      this.revealedHintsCount.update((c) => c + 1);
    }
  }

  checkAnswer() {
    const id = this.selectedOptionId();
    if (!id) return;

    const currentQ = this.currentQuestion();
    const chosen = currentQ.options.find((o) => o.id === id);
    const isCorrect = !!chosen?.isCorrect;

    this.submittedAnswer.set(true);
    this.questionResults.update((res) => ({
      ...res,
      [currentQ.id]: { selectedId: id, isCorrect },
    }));
  }

  tryAgain() {
    this.selectedOptionId.set(null);
    this.submittedAnswer.set(false);
  }

  nextQuestion() {
    if (this.currentIndex() < this.totalQuestions() - 1) {
      const nextIdx = this.currentIndex() + 1;
      this.currentIndex.set(nextIdx);

      // restore or reset state for next question
      const nextQ = this.questions()[nextIdx];
      const prevRes = this.questionResults()[nextQ.id];
      if (prevRes) {
        this.selectedOptionId.set(prevRes.selectedId);
        this.submittedAnswer.set(true);
      } else {
        this.selectedOptionId.set(null);
        this.submittedAnswer.set(false);
      }
      this.revealedHintsCount.set(0);
    } else {
      this.completedDrill.set(true);
    }
  }

  previousQuestion() {
    if (this.currentIndex() > 0) {
      const prevIdx = this.currentIndex() - 1;
      this.currentIndex.set(prevIdx);

      const prevQ = this.questions()[prevIdx];
      const prevRes = this.questionResults()[prevQ.id];
      if (prevRes) {
        this.selectedOptionId.set(prevRes.selectedId);
        this.submittedAnswer.set(true);
      } else {
        this.selectedOptionId.set(null);
        this.submittedAnswer.set(false);
      }
      this.revealedHintsCount.set(0);
    }
  }

  jumpToQuestion(index: number) {
    if (index >= 0 && index < this.totalQuestions()) {
      this.currentIndex.set(index);
      const targetQ = this.questions()[index];
      const prevRes = this.questionResults()[targetQ.id];
      if (prevRes) {
        this.selectedOptionId.set(prevRes.selectedId);
        this.submittedAnswer.set(true);
      } else {
        this.selectedOptionId.set(null);
        this.submittedAnswer.set(false);
      }
      this.revealedHintsCount.set(0);
    }
  }

  restartDrill() {
    this.currentIndex.set(0);
    this.selectedOptionId.set(null);
    this.submittedAnswer.set(false);
    this.revealedHintsCount.set(0);
    this.completedDrill.set(false);
    this.questionResults.set({});
  }
 
  exitRunner() {
    this.router.navigate(['/learn/practice']);
  }
}
