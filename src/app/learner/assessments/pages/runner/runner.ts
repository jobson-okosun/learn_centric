import { Component, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export interface ExamOption {
  id: string;
  label: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  number: number;
  stem: string;
  points: number;
  options: ExamOption[];
}

@Component({
  templateUrl: './runner.html',
  styleUrl: './runner.css',
})
export default class Runner implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly assessmentId = signal('math301-midterm');
  readonly examTitle = signal('Multivariable Calculus Midterm Examination');
  readonly courseCode = signal('MATH-301');
  readonly currentIndex = signal(0);

  // Timer: 90 minutes = 5400 seconds
  readonly remainingSeconds = signal(5384);
  private timerInterval: any = null;

  // Auto-save tracker
  readonly lastSaved = signal('Saved just now');
  readonly isSaving = signal(false);

  // User state
  readonly answers = signal<Record<string, string>>({
    q1: 'opt_1b',
    q2: 'opt_2c',
    q3: 'opt_3a',
    q4: 'opt_4d',
  });
  readonly flagged = signal<Set<string>>(new Set(['q2']));

  // Confirmation dialog
  readonly isSubmitModalOpen = signal(false);

  readonly questions = signal<ExamQuestion[]>([
    {
      id: 'q1',
      number: 1,
      points: 5,
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Evaluate the double integral ∬<sub>R</sub> (2x + 4y) dA over the rectangular region R = [0, 2] × [0, 3].</p>',
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
      points: 5,
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Let <i>f(x, y)</i> = x³ y² - 4xy + 7. Compute the second-order mixed partial derivative ∂²f / (∂y ∂x).</p>',
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
      points: 5,
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Determine the gradient vector ∇f(1, -1) for the scalar field <i>f(x, y)</i> = 3x² y + 2y³.</p>',
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
      points: 5,
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Compute the maximum rate of change of <i>f(x, y, z)</i> = x² y z³ at the point P(2, 1, 1).</p>',
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
      points: 5,
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Apply the method of Lagrange multipliers to maximize <i>f(x, y)</i> = xy subject to the constraint x² + y² = 8. Determine the maximum value of <i>f</i>.</p>',
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
      points: 5,
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Using the Divergence Theorem, evaluate the outward flux of <b>F</b> = ⟨ 2x, 3y, z ⟩ across the boundary of the unit ball x² + y² + z² ≤ 1.</p>',
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
      points: 5,
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">A vector field <b>F</b> = ⟨ 2xy + z, x² + 3y², x ⟩ is conservative. Determine the potential function ϕ(x, y, z) satisfying ∇ϕ = <b>F</b> with ϕ(0,0,0) = 0.</p>',
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
      points: 5,
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Apply Green’s Theorem to compute the counterclockwise boundary line integral ∮<sub>C</sub> (y² dx + 3xy dy) around the unit square [0, 1] × [0, 1].</p>',
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
      points: 5,
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Determine the surface area of the portion of the plane 2x + 2y + z = 6 that lies within the first octant.</p>',
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
      points: 5,
      stem: '<p class="text-[15px] text-gray-800 leading-relaxed font-normal">Compute the Jacobian determinant ∂(x, y) / ∂(u, v) for the coordinate transformation x = u² - v², y = 2uv.</p>',
      options: [
        { id: 'opt_10a', label: 'A', text: '4(u² + v²)' },
        { id: 'opt_10b', label: 'B', text: '2(u² + v²)' },
        { id: 'opt_10c', label: 'C', text: '4(u² - v²)' },
        { id: 'opt_10d', label: 'D', text: '4uv' },
      ],
    },
  ]);

  readonly currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  readonly totalQuestions = computed(() => this.questions().length);
  readonly currentSelectedOptionId = computed(() => this.answers()[this.currentQuestion().id]);
  readonly isCurrentFlagged = computed(() => this.flagged().has(this.currentQuestion().id));

  readonly answeredCount = computed(() => Object.keys(this.answers()).length);
  readonly unansweredCount = computed(() => this.totalQuestions() - this.answeredCount());
  readonly flaggedCount = computed(() => this.flagged().size);

  // Formatted timer
  readonly formattedTime = computed(() => {
    const sec = this.remainingSeconds();
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    const hh = h > 0 ? `${h.toString().padStart(2, '0')}:` : '';
    const mm = m.toString().padStart(2, '0');
    const ss = s.toString().padStart(2, '0');
    return `${hh}${mm}:${ss}`;
  });

  readonly isTimerCritical = computed(() => this.remainingSeconds() < 300); // < 5 mins
  readonly isTimerWarning = computed(() => this.remainingSeconds() < 600 && !this.isTimerCritical()); // < 10 mins

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.assessmentId.set(id);
    }

    // Start timer countdown
    this.timerInterval = setInterval(() => {
      this.remainingSeconds.update(s => {
        if (s <= 1) {
          clearInterval(this.timerInterval);
          this.autoSubmitOnTimeout();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  selectOption(optId: string) {
    const qId = this.currentQuestion().id;
    this.answers.update(map => ({
      ...map,
      [qId]: optId,
    }));

    // Trigger mock auto-save feedback
    this.isSaving.set(true);
    setTimeout(() => {
      this.isSaving.set(false);
      this.lastSaved.set('Saved just now');
    }, 400);
  }

  toggleFlag() {
    const qId = this.currentQuestion().id;
    this.flagged.update(set => {
      const next = new Set(set);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      return next;
    });
  }

  goToQuestion(idx: number) {
    if (idx >= 0 && idx < this.totalQuestions()) {
      this.currentIndex.set(idx);
    }
  }

  nextQuestion() {
    if (this.currentIndex() < this.totalQuestions() - 1) {
      this.currentIndex.update(i => i + 1);
    }
  }

  previousQuestion() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    }
  }

  openSubmitConfirmation() {
    this.isSubmitModalOpen.set(true);
  }

  closeSubmitConfirmation() {
    this.isSubmitModalOpen.set(false);
  }

  confirmSubmission() {
    this.closeSubmitConfirmation();
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.router.navigate(['/learn/assessments', this.assessmentId(), 'result']);
  }

  private autoSubmitOnTimeout() {
    this.router.navigate(['/learn/assessments', this.assessmentId(), 'result']);
  }
}
