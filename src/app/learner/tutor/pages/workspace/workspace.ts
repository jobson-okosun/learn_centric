import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface TutorHint {
  step: number;
  text: string;
  revealed: boolean;
}

export interface TutorMessage {
  id: string;
  sender: 'learner' | 'tutor';
  timestamp: string;
  text: string;
  pedagogyBadge?: string;
  formula?: string;
  codeSnippet?: { language: string; code: string };
  hints?: TutorHint[];
  suggestedFollowUps?: string[];
}

export interface StudySession {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  lastActive: string;
  isPinned?: boolean;
  mode: 'socratic' | 'breakdown' | 'diagnostic' | 'misconception';
  messages: TutorMessage[];
}

@Component({
  imports: [FormsModule],
  templateUrl: './workspace.html',
  styleUrl: './workspace.css',
})
export default class Workspace {
  readonly searchQuery = signal('');
  readonly activeCourse = signal('PHYS-201');
  readonly activeMode = signal<'socratic' | 'breakdown' | 'diagnostic' | 'misconception'>('socratic');
  readonly activeSessionId = signal('session-phys-1');
  readonly draftInput = signal('');
  readonly isThinking = signal(false);

  readonly composerPlaceholder = computed(() => {
    switch (this.activeMode()) {
      case 'breakdown':
        return 'Describe a concept or mechanism you want an intuitive mental model for... (Press Enter to send)';
      case 'diagnostic':
        return 'Specify the topic you want to test your understanding on with a diagnostic question... (Press Enter to send)';
      case 'misconception':
        return 'Paste your working or describe an unexpected result in your calculation... (Press Enter to send)';
      default:
        return 'Ask a conceptual question, describe where you are stuck, or paste a formula... (Press Enter to send)';
    }
  });

  readonly coursesList = signal([
    { code: 'MATH-301', name: 'Multivariable Calculus' },
    { code: 'PHYS-201', name: 'General Physics & Electromagnetism' },
    { code: 'CS-210', name: 'Data Structures & Algorithms' },
    { code: 'BIO-204', name: 'Cellular & Molecular Biology' },
  ]);

  readonly starterPrompts = signal([
    {
      course: 'MATH-301',
      title: "Green's Theorem Fluid Circulation",
      prompt: "Can you provide an intuitive geometric explanation for why summing microscopic curl over a 2D region equals the line integral along its boundary?",
    },
    {
      course: 'MATH-301',
      title: "Coupled 2nd-Order ODE Eigenvalues",
      prompt: "In a coupled two-mass spring system with no damping, what should the eigenvalues of the state matrix look like, and why can't they have positive real parts?",
    },
    {
      course: 'PHYS-201',
      title: "Displacement Current in Ampère's Law",
      prompt: "Why does Maxwell add displacement current to Ampère's law when analyzing charging capacitors? What inconsistency does it resolve?",
    },
    {
      course: 'CS-210',
      title: "A* Euclidean Distance Admissibility",
      prompt: "If road networks have differing speed limits, why might standard straight-line Euclidean distance fail to be an admissible heuristic for travel time?",
    },
  ]);

  readonly sessions = signal<StudySession[]>([
    {
      id: 'session-phys-1',
      title: 'New Study Session',
      courseCode: 'PHYS-201',
      courseName: 'General Physics & Electromagnetism',
      lastActive: 'Just now',
      isPinned: false,
      mode: 'socratic',
      messages: [],
    },
    {
      id: 'session-1',
      title: "Green's Theorem & Microscopic Curl Circulation",
      courseCode: 'MATH-301',
      courseName: 'Multivariable Calculus',
      lastActive: '10 mins ago',
      isPinned: true,
      mode: 'socratic',
      messages: [
        {
          id: 'm-1',
          sender: 'learner',
          timestamp: '10:15 AM',
          text: "I understand the algebraic equality ∮_C (P dx + Q dy) = ∬_D (∂Q/∂x - ∂P/∂y) dA, but could you explain intuitively why summing microscopic curl over a 2D surface gives the boundary line integral?",
        },
        {
          id: 'm-2',
          sender: 'tutor',
          timestamp: '10:16 AM',
          pedagogyBadge: 'Socratic Nudge',
          text: "Great intuition question! To see this geometrically, imagine dividing your region D into a grid of tiny sub-rectangles or 'paddle wheels' spinning in a fluid flow.\n\nConsider two adjacent tiny squares inside D sharing an internal boundary wall. If microscopic curl is the net counter-clockwise circulation around each square:",
          formula: "∮_C (P dx + Q dy) = ∬_D (\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}) dA",
          hints: [
            {
              step: 1,
              text: "Think about the direction of circulation along the shared internal wall: which way is the fluid flowing according to the left square, versus the right square?",
              revealed: true,
            },
            {
              step: 2,
              text: "Along that internal boundary, the two opposite flows have identical magnitude but opposite signs (+F vs -F). What is their sum?",
              revealed: false,
            },
            {
              step: 3,
              text: "Every internal edge has an opposing twin that cancels out. The only edges that never get cancelled are the ones on the outer boundary C!",
              revealed: false,
            },
          ],
          suggestedFollowUps: [
            "What happens if the boundary path C is traversed clockwise instead?",
            "How does this extend to 3D surfaces in Stokes' Theorem?",
            "Can we test this on a simple conservative field where curl = 0?",
          ],
        },
      ],
    },
    {
      id: 'session-2',
      title: "Dijkstra vs A* Admissibility Breakdown",
      courseCode: 'CS-210',
      courseName: 'Data Structures & Algorithms',
      lastActive: 'Yesterday',
      isPinned: false,
      mode: 'breakdown',
      messages: [
        {
          id: 'm-3',
          sender: 'learner',
          timestamp: 'Yesterday, 3:30 PM',
          text: "When implementing A* on a real road network with variable speed limits, can I use straight-line Euclidean distance as my heuristic h(n)?",
        },
        {
          id: 'm-4',
          sender: 'tutor',
          timestamp: 'Yesterday, 3:31 PM',
          pedagogyBadge: 'Conceptual Insight',
          text: "Let's test the definition of admissibility: an admissible heuristic must never overestimate the true remaining cost to the goal (h(n) ≤ h*(n)).\n\nIf edge weights represent travel time rather than physical distance, consider a situation where a straight highway allows travel at 120 km/h, while a winding city road allows 30 km/h.",
          codeSnippet: {
            language: 'python',
            code: "# Admissible heuristic condition for travel times:\n# h(n) = euclidean_distance(n, goal) / max_speed_in_entire_network\n\ndef heuristic(node, goal, max_speed=120.0):\n    dist = math.dist(node.coords, goal.coords)\n    return dist / max_speed  # Guarantees h(n) <= true_time",
          },
          suggestedFollowUps: [
            "What happens if max_speed is chosen too low?",
            "How does consistency (monotonicity) differ from admissibility?",
          ],
        },
      ],
    },
    {
      id: 'session-3',
      title: "Coupled Oscillator Differential Equations",
      courseCode: 'MATH-301',
      courseName: 'Multivariable Calculus',
      lastActive: 'Oct 14',
      isPinned: false,
      mode: 'misconception',
      messages: [
        {
          id: 'm-5',
          sender: 'learner',
          timestamp: 'Oct 14, 11:20 AM',
          text: "For Problem Set 4, my system matrix eigenvalues are coming out as λ = 1.5 ± 3i, but the physical spring has no friction. Why is my amplitude growing exponentially?",
        },
        {
          id: 'm-6',
          sender: 'tutor',
          timestamp: 'Oct 14, 11:21 AM',
          pedagogyBadge: 'Misconception Diagnostic',
          text: "You've spotted a critical physical contradiction! In an undamped conservative harmonic oscillator, energy must be strictly conserved. If Re(λ) > 0, the term e^(1.5t) causes amplitude to diverge to infinity.\n\nLet's check your characteristic equation:",
          formula: "\\det(A - \\lambda I) = \\lambda^2 - \\text{Tr}(A)\\lambda + \\det(A) = 0",
          hints: [
            {
              step: 1,
              text: "Check the trace of your system matrix A. What is the sum of the diagonal entries for an undamped system written as [x', v']^T?",
              revealed: true,
            },
            {
              step: 2,
              text: "The diagonal entries are 0 and 0 (dx/dt = v, dv/dt = -kx/m). Thus Tr(A) = 0, which means the linear λ term must be zero!",
              revealed: false,
            },
          ],
          suggestedFollowUps: [
            "Walk me through computing the matrix trace",
            "How do I normalize the imaginary eigenvectors?",
          ],
        },
      ],
    },
  ]);

  readonly activeSession = computed(() => {
    return this.sessions().find(s => s.id === this.activeSessionId()) || this.sessions()[0] || null;
  });

  readonly filteredSessions = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const course = this.activeCourse();

    return this.sessions().filter(s => {
      if (course !== 'all' && s.courseCode !== course) {
        return false;
      }
      if (q) {
        return s.title.toLowerCase().includes(q) || s.courseCode.toLowerCase().includes(q);
      }
      return true;
    });
  });

  selectSession(id: string) {
    this.activeSessionId.set(id);
    const s = this.sessions().find(item => item.id === id);
    if (s) {
      this.activeCourse.set(s.courseCode);
      this.activeMode.set(s.mode);
    }
  }

  createNewSession(initialTitle?: string, courseCode?: string) {
    const code = courseCode || this.activeCourse();
    const courseObj = this.coursesList().find(c => c.code === code);
    const newId = 'session-' + Date.now();
    const title = initialTitle || 'New Study Session';

    const newSession: StudySession = {
      id: newId,
      title: title,
      courseCode: code,
      courseName: courseObj ? courseObj.name : 'Multivariable Calculus',
      lastActive: 'Just now',
      isPinned: false,
      mode: this.activeMode(),
      messages: [],
    };

    this.sessions.update(list => [newSession, ...list]);
    this.activeSessionId.set(newId);
  }

  togglePinSession(id: string, event: Event) {
    event.stopPropagation();
    this.sessions.update(list =>
      list.map(s => (s.id === id ? { ...s, isPinned: !s.isPinned } : s))
    );
  }

  setMode(mode: 'socratic' | 'breakdown' | 'diagnostic' | 'misconception') {
    this.activeMode.set(mode);
    const active = this.activeSession();
    if (active) {
      this.sessions.update(list =>
        list.map(s => (s.id === active.id ? { ...s, mode } : s))
      );
    }
  }

  revealHint(messageId: string, stepNumber: number) {
    const active = this.activeSession();
    if (!active) return;

    this.sessions.update(list =>
      list.map(s => {
        if (s.id === active.id) {
          const updatedMessages = s.messages.map(m => {
            if (m.id === messageId && m.hints) {
              const updatedHints = m.hints.map(h =>
                h.step === stepNumber ? { ...h, revealed: true } : h
              );
              return { ...m, hints: updatedHints };
            }
            return m;
          });
          return { ...s, messages: updatedMessages };
        }
        return s;
      })
    );
  }

  sendMessage() {
    const text = this.draftInput().trim();
    if (!text) return;

    const active = this.activeSession();
    if (!active) return;

    const userMsg: TutorMessage = {
      id: 'msg-' + Date.now(),
      sender: 'learner',
      timestamp: 'Just now',
      text: text,
    };

    this.sessions.update(list =>
      list.map(s => {
        if (s.id === active.id) {
          return {
            ...s,
            title: s.messages.length === 0 ? text.slice(0, 42) + (text.length > 42 ? '...' : '') : s.title,
            lastActive: 'Just now',
            messages: [...s.messages, userMsg],
          };
        }
        return s;
      })
    );

    this.draftInput.set('');
    this.isThinking.set(true);

    // Simulate AI Socratic Response with pedagogic depth
    setTimeout(() => {
      this.generateTutorResponse(text, active.id);
      this.isThinking.set(false);
    }, 800);
  }

  sendQuickPrompt(promptText: string, courseCode?: string) {
    if (courseCode && courseCode !== this.activeCourse()) {
      this.activeCourse.set(courseCode);
    }
    this.draftInput.set(promptText);
    this.sendMessage();
  }

  private generateTutorResponse(studentQuery: string, sessionId: string) {
    const mode = this.activeMode();
    let replyText = '';
    let formula: string | undefined = undefined;
    let badge = 'Socratic Nudge';
    let hints: TutorHint[] | undefined = undefined;
    let followUps: string[] = [];

    if (mode === 'socratic') {
      badge = 'Socratic Guided Question';
      replyText = `That's an insightful starting point. Before we jump into the formula, let's break down the underlying mechanism:\n\nWhat would happen to the balance of the system if you increased the principal variable by a small perturbation ε? Does the restoring force push it back toward equilibrium, or pull it further away?`;
      hints = [
        {
          step: 1,
          text: "Consider the signs in the governing equation when x > 0.",
          revealed: false,
        },
        {
          step: 2,
          text: "If F = -kx, the force opposes displacement, maintaining bounded oscillatory trajectories.",
          revealed: false,
        },
      ];
      followUps = [
        "It acts like a restoring force pulling back to zero",
        "Can we write the state-space matrix for this?",
        "What happens if damping b > 0 is introduced?",
      ];
    } else if (mode === 'breakdown') {
      badge = 'Concept Mental Model';
      replyText = `Here is a clear mental model to anchor your thinking:\n\nThink of this concept like an elastic membrane or fluid velocity field. Every small patch has local behavior, but when you integrate across the entire domain, all internal boundaries cancel out in matched opposing pairs.`;
      formula = "\\oint_{\\partial \\Omega} \\vec{F} \\cdot d\\vec{r} = \\iint_\\Omega (\\nabla \\times \\vec{F}) \\cdot \\hat{n} \\, dA";
      followUps = [
        "Show a practical engineering application",
        "How do I verify if a field has zero curl everywhere?",
      ];
    } else if (mode === 'diagnostic') {
      badge = 'Diagnostic Check';
      replyText = `Let's test your conceptual retention with a quick diagnostic question:\n\nSuppose you evaluate a line integral of a vector field F over an arbitrary closed circular loop C. If the field is conservative (curl F = 0 everywhere in the plane), what MUST the value of the line integral be?`;
      followUps = [
        "The line integral is exactly 0",
        "It depends on the radius of the circle",
        "It equals the area enclosed times curl",
      ];
    } else {
      badge = 'Misconception Analysis';
      replyText = `Let's inspect your calculation step closely. The most frequent pitfall here is treating partial derivatives as total derivatives or forgetting the chain rule Jacobian determinant when transforming coordinates.`;
      formula = "dx \\, dy = |J| \\, dr \\, d\\theta = r \\, dr \\, d\\theta";
      followUps = [
        "Why does the extra factor of 'r' appear geometrically?",
        "How does the volume element change in spherical coordinates?",
      ];
    }

    const aiMsg: TutorMessage = {
      id: 'msg-' + Date.now(),
      sender: 'tutor',
      timestamp: 'Just now',
      pedagogyBadge: badge,
      text: replyText,
      formula: formula,
      hints: hints,
      suggestedFollowUps: followUps,
    };

    this.sessions.update(list =>
      list.map(s => {
        if (s.id === sessionId) {
          return {
            ...s,
            messages: [...s.messages, aiMsg],
          };
        }
        return s;
      })
    );
  }
}
