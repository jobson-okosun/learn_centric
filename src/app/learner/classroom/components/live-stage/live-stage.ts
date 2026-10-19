import { Component, signal, computed, inject, viewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports } from '@/shared/components/drawer';
import { ZardNavigationMenuImports } from '@/shared/components/navigation-menu';
import { ZardDialogRef, ZardDialogService, injectDialogData } from '@/shared/components/dialog';

export interface LiveStageSessionData {
  id?: string;
  title?: string;
  courseCode?: string;
  courseTitle?: string;
  classCohort?: string;
  instructor?: string;
  room?: string;
  attendeesCount?: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  time: string;
  text: string;
  isInstructor?: boolean;
  isTA?: boolean;
  isMe?: boolean;
  upvotes?: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface LivePoll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedId?: string;
  isActive: boolean;
  timeRemaining?: string;
}

export interface FloatingReaction {
  id: number;
  emoji: string;
  leftPercent: number;
}

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ZardDrawerComponent,
    ZardDrawerHeaderComponent,
    ZardDrawerImports,
    ZardNavigationMenuImports,
  ],
  selector: 'app-learner-live-stage',
  templateUrl: './live-stage.html',
  styleUrl: './live-stage.css',
})
export class LiveStageModal {
  private readonly dialogRef = inject(ZardDialogRef, { optional: true });
  private readonly dialog = inject(ZardDialogService);
  private readonly modalData = injectDialogData<LiveStageSessionData>();

  activeQuizModal = viewChild<TemplateRef<any>>('takeQuizModal');
  activeDialogRef?: any;

  // Session metadata
  readonly session = signal<LiveStageSessionData>({
    title: this.modalData?.title || 'Damped Harmonic Oscillations & Phase Portraits',
    courseCode: this.modalData?.courseCode || 'PHYS-201',
    courseTitle: this.modalData?.courseTitle || 'Classical Mechanics & Systems',
    classCohort: this.modalData?.classCohort || 'Spring 2026 • Section A',
    instructor: this.modalData?.instructor || 'Dr. Marcus Vance',
    room: this.modalData?.room || 'Virtual Hall 4 (Live Stream)',
    attendeesCount: this.modalData?.attendeesCount || 34,
  });

  // Stage display modes: 'slides' | 'speaker' | 'split'
  readonly stageMode = signal<'slides' | 'speaker' | 'split'>('slides');

  // Slide deck state
  readonly currentSlide = signal(8);
  readonly totalSlides = signal(24);

  // Audio / Video / Hand Raise
  readonly isMuted = signal(true);
  readonly isVideoOn = signal(false);
  readonly isHandRaised = signal(false);
  readonly handRaisePosition = signal(2);

  // Closed Captions (AI Live Transcription)
  readonly captionsEnabled = signal(true);
  readonly currentCaption = signal(
    'Notice how the damping coefficient γ exponentially attenuates the envelope amplitude while the shifted frequency ω₁ remains constant over each period cycle.'
  );

  // Sidebars toggles (strictly matching tutor live-session)
  readonly attendeesSidebarOpen = signal(false);
  readonly chatSidebarOpen = signal(false);
  readonly pollsSidebarOpen = signal(false);
  readonly quizzesSidebarOpen = signal(false);
  readonly unreadChat = signal(true);
  readonly sessionTimer = signal('45:12:30');

  // Quiz taking state
  readonly activeQuiz = signal({
    title: 'Midterm Assessment: Wave Dynamics & Oscillations',
    instructions: 'Answer all 4 multiple-choice conceptual questions based on today’s derivations.',
    timeRemaining: '09:42',
    questions: [
      {
        id: 'q1',
        prompt: 'In the underdamped regime (0 < ζ < 1), how does the damped frequency ω₁ compare to the natural undamped frequency ω₀?',
        options: ['ω₁ > ω₀', 'ω₁ < ω₀', 'ω₁ = ω₀', 'ω₁ = 0'],
        correct: 1,
      },
      {
        id: 'q2',
        prompt: 'What physical quantity does the factor e^(-γt) govern in the displacement equation?',
        options: ['The period of oscillation', 'The exponential decay envelope', 'The phase angle φ', 'The spring constant k'],
        correct: 1,
      },
      {
        id: 'q3',
        prompt: 'When the damping parameter b equals the critical damping value 2√(km), the system is:',
        options: ['Overdamped', 'Underdamped', 'Critically damped', 'Resonant'],
        correct: 2,
      },
    ],
  });
  readonly quizAnswers = signal<Record<number, number>>({});
  readonly quizSubmitted = signal(false);
  readonly quizScore = signal<number | null>(null);

  // Chat & Q&A
  readonly activeChatTab = signal<'chat' | 'qa'>('chat');
  readonly chatInput = signal('');
  readonly messages = signal<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'Dr. Marcus Vance',
      time: '10:02 AM',
      text: 'Good morning everyone! Please have equation 4.12 from chapter 3 ready on your scratchpads.',
      isInstructor: true,
    },
    {
      id: 'm-2',
      sender: 'Alex Chen (TA)',
      time: '10:05 AM',
      text: 'Reminder: I will be answering secondary derivations in the Q&A tab as Prof. Vance lectures.',
      isTA: true,
    },
    {
      id: 'm-3',
      sender: 'David Miller',
      time: '10:09 AM',
      text: 'Is the damping ratio zeta assumed to be strictly less than 1 for underdamping?',
    },
    {
      id: 'm-4',
      sender: 'Dr. Marcus Vance',
      time: '10:10 AM',
      text: 'Correct, David. 0 < ζ < 1 gives oscillatory decay; ζ = 1 is critical damping.',
      isInstructor: true,
    },
    {
      id: 'm-5',
      sender: 'Sophia Taylor',
      time: '10:14 AM',
      text: 'The slide diagram makes the phase lag very intuitive!',
    },
  ]);

  // Questions for Prof (Q&A tab)
  readonly questions = signal<ChatMessage[]>([
    {
      id: 'q-1',
      sender: 'Elena Rostova',
      time: '10:12 AM',
      text: 'Does energy dissipation rate dE/dt = -b*v^2 hold for non-linear damping regimes?',
      upvotes: 6,
    },
    {
      id: 'q-2',
      sender: 'Jordan Blake',
      time: '10:15 AM',
      text: 'Can we apply Green’s function to solve for external driving forces on slide 12?',
      upvotes: 4,
    },
  ]);

  // Active Poll
  readonly activePoll = signal<LivePoll>({
    id: 'poll-1',
    question: 'What happens to the oscillation period T₁ as damping coefficient γ increases in the underdamped regime?',
    totalVotes: 31,
    isActive: true,
    options: [
      { id: 'opt-a', text: 'T₁ increases (period lengthens, frequency drops)', votes: 21 },
      { id: 'opt-b', text: 'T₁ decreases (oscillates faster)', votes: 6 },
      { id: 'opt-c', text: 'T₁ remains invariant to damping', votes: 4 },
      { id: 'opt-d', text: 'Oscillations cease immediately', votes: 0 },
    ],
  });
  readonly selectedPollOption = signal<string | null>(null);
  readonly hasVoted = signal(false);

  // Attendees list
  readonly attendees = signal([
    { name: 'Dr. Marcus Vance', role: 'Instructor / Host', isSpeaking: true, isMuted: false, isHost: true },
    { name: 'Alex Chen', role: 'Teaching Assistant', isSpeaking: false, isMuted: true, isTA: true },
    { name: 'Alex Morgan (You)', role: 'Learner', isSpeaking: false, isMuted: true, isMe: true },
    { name: 'David Miller', role: 'Learner', isSpeaking: false, isMuted: true, handRaised: true },
    { name: 'Elena Rostova', role: 'Learner', isSpeaking: false, isMuted: true },
    { name: 'Jordan Blake', role: 'Learner', isSpeaking: false, isMuted: true },
    { name: 'Sophia Taylor', role: 'Learner', isSpeaking: false, isMuted: true },
    { name: 'Lucas Scott', role: 'Learner', isSpeaking: false, isMuted: true },
    { name: 'Maya Lin', role: 'Learner', isSpeaking: false, isMuted: true },
    { name: 'Liam Murphy', role: 'Learner', isSpeaking: false, isMuted: true },
  ]);

  // Student's private lecture notes
  readonly studentNotes = signal(
    `# Lecture Notes — ${this.session().title}
- Equation of motion: m*(d^2x/dt^2) + b*(dx/dt) + k*x = 0
- Solution envelope: x(t) = A0 * e^(-gamma*t) * cos(omega1*t + phi)
- Natural freq: omega0 = sqrt(k/m)
- Damped freq: omega1 = sqrt(omega0^2 - gamma^2)
- Note: Review problem set 4 question 3 before tomorrow's recitation!`
  );
  readonly notesSaved = signal(true);

  // Floating live emoji reactions
  readonly reactions = signal<FloatingReaction[]>([]);
  private reactionIdCounter = 0;

  // Confirmation before exit
  readonly confirmExit = signal(false);

  toggleAttendeesSidebar(): void {
    this.attendeesSidebarOpen.update(v => !v);
  }

  toggleChatSidebar(): void {
    this.chatSidebarOpen.update(v => !v);
    if (this.chatSidebarOpen()) {
      this.unreadChat.set(false);
    }
  }

  togglePollsSidebar(): void {
    this.pollsSidebarOpen.set(!this.pollsSidebarOpen());
    this.quizzesSidebarOpen.set(false);
  }

  toggleQuizzesSidebar(): void {
    this.quizzesSidebarOpen.set(!this.quizzesSidebarOpen());
    this.pollsSidebarOpen.set(false);
  }

  openQuizDialog(): void {
    const modal = this.activeQuizModal();
    if (!modal) return;
    this.activeDialogRef = this.dialog.create({
      zTitle: 'Live Class Assessment',
      zContent: modal,
      zHideFooter: true,
      zCustomClasses: '!max-w-2xl w-full',
    });
  }

  closeDialog(): void {
    this.activeDialogRef?.close();
  }

  selectQuizOption(questionIndex: number, optionIndex: number): void {
    if (this.quizSubmitted()) return;
    this.quizAnswers.update(curr => ({
      ...curr,
      [questionIndex]: optionIndex,
    }));
  }

  submitQuiz(): void {
    const quiz = this.activeQuiz();
    const answers = this.quizAnswers();
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        correctCount++;
      }
    });
    this.quizScore.set(Math.round((correctCount / quiz.questions.length) * 100));
    this.quizSubmitted.set(true);
  }

  toggleMute(): void {
    this.isMuted.update(v => !v);
  }

  toggleVideo(): void {
    this.isVideoOn.update(v => !v);
  }

  toggleHandRaise(): void {
    this.isHandRaised.update(v => !v);
  }

  toggleCaptions(): void {
    this.captionsEnabled.update(v => !v);
  }

  setStageMode(mode: 'slides' | 'speaker' | 'split'): void {
    this.stageMode.set(mode);
  }

  sendReaction(emoji: string): void {
    const id = ++this.reactionIdCounter;
    const leftPercent = 25 + Math.random() * 50;
    this.reactions.update(list => [...list, { id, emoji, leftPercent }]);

    setTimeout(() => {
      this.reactions.update(list => list.filter(r => r.id !== id));
    }, 2800);
  }

  submitPollVote(optionId: string): void {
    if (this.hasVoted()) return;
    this.selectedPollOption.set(optionId);
    this.hasVoted.set(true);

    this.activePoll.update(poll => {
      const updatedOptions = poll.options.map(opt =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );
      return {
        ...poll,
        options: updatedOptions,
        totalVotes: poll.totalVotes + 1,
        userVotedId: optionId,
      };
    });
  }

  sendChatMessage(): void {
    const text = this.chatInput().trim();
    if (!text) return;

    if (this.activeChatTab() === 'chat') {
      this.messages.update(list => [
        ...list,
        {
          id: `msg-${Date.now()}`,
          sender: 'Alex Morgan (You)',
          time: 'Just now',
          text,
          isMe: true,
        },
      ]);
    } else {
      this.questions.update(list => [
        ...list,
        {
          id: `q-${Date.now()}`,
          sender: 'Alex Morgan (You)',
          time: 'Just now',
          text,
          isMe: true,
          upvotes: 1,
        },
      ]);
    }
    this.chatInput.set('');
  }

  upvoteQuestion(questionId: string): void {
    this.questions.update(list =>
      list.map(q =>
        q.id === questionId ? { ...q, upvotes: (q.upvotes || 0) + 1 } : q
      )
    );
  }

  onNotesChange(text: string): void {
    this.studentNotes.set(text);
    this.notesSaved.set(false);
    setTimeout(() => this.notesSaved.set(true), 800);
  }

  promptExit(): void {
    this.confirmExit.set(true);
  }

  cancelExit(): void {
    this.confirmExit.set(false);
  }

  leaveStage(): void {
    this.dialogRef?.close();
  }

  // Slide navigation
  nextSlide(): void {
    if (this.currentSlide() < this.totalSlides()) {
      this.currentSlide.update(c => c + 1);
    }
  }

  prevSlide(): void {
    if (this.currentSlide() > 1) {
      this.currentSlide.update(c => c - 1);
    }
  }
}
