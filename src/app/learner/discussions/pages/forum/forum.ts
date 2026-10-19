import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ForumReply {
  id: string;
  authorName: string;
  authorRole: 'instructor' | 'ta' | 'student';
  authorInitials: string;
  avatarBg?: string;
  timestamp: string;
  content: string;
  isVerifiedAnswer?: boolean;
  upvotes: number;
}

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  courseCode: string;
  courseName: string;
  topic: string;
  authorName: string;
  authorRole: 'instructor' | 'ta' | 'student';
  authorInitials: string;
  timestamp: string;
  upvotes: number;
  repliesCount: number;
  isPinned?: boolean;
  isInstructorAnswered?: boolean;
  isBookmarked?: boolean;
  isUpvoted?: boolean;
  replies?: ForumReply[];
}

@Component({
  imports: [FormsModule],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export default class Forum {
  readonly searchQuery = signal('');
  readonly selectedCourse = signal('all');
  readonly filterStatus = signal<'all' | 'answered' | 'open' | 'my' | 'bookmarked'>('all');
  readonly unreadOnly = signal(false);
  
  // Modals & Drawers
  readonly isAskModalOpen = signal(false);
  readonly selectedThread = signal<ForumThread | null>(null);

  // New Question Form state
  readonly newCourseCode = signal('MATH-301');
  readonly newTitle = signal('');
  readonly newTopic = signal('');
  readonly newContent = signal('');
  readonly notifyReplies = signal(true);

  // Reply Draft
  readonly newReplyContent = signal('');

  readonly coursesList = signal([
    { code: 'MATH-301', name: 'Multivariable Calculus' },
    { code: 'PHYS-201', name: 'General Physics & Electromagnetism' },
    { code: 'CS-210', name: 'Data Structures & Algorithms' },
    { code: 'BIO-204', name: 'Cellular & Molecular Biology' },
  ]);

  readonly threads = signal<ForumThread[]>([
    {
      id: 'th-1',
      title: 'Midterm Exam: Formula Sheet Clarification & Permitted Calculators',
      content: 'Please review the official guidelines for Wednesday’s midterm exam. Formula sheets will be provided directly in the test runner. Graphing calculators without wireless connections are allowed.',
      courseCode: 'MATH-301',
      courseName: 'Multivariable Calculus',
      topic: 'Announcements & Policy',
      authorName: 'Prof. Jonathan Hayes',
      authorRole: 'instructor',
      authorInitials: 'JH',
      timestamp: '2 hours ago',
      upvotes: 42,
      repliesCount: 8,
      isPinned: true,
      isInstructorAnswered: true,
      isBookmarked: true,
      isUpvoted: true,
      replies: [
        {
          id: 'rep-1a',
          authorName: 'Sarah Jenkins',
          authorRole: 'student',
          authorInitials: 'SJ',
          timestamp: '1 hour ago',
          content: 'Are we allowed to bring scrap paper, or will blank sheets be distributed at the check-in desk?',
          upvotes: 6,
        },
        {
          id: 'rep-1b',
          authorName: 'Prof. Jonathan Hayes',
          authorRole: 'instructor',
          authorInitials: 'JH',
          timestamp: '45 mins ago',
          content: 'Official university scrap paper will be distributed at each station. You do not need to bring your own paper.',
          isVerifiedAnswer: true,
          upvotes: 18,
        },
      ],
    },
    {
      id: 'th-2',
      title: 'Intuitive visual interpretation of Green’s Theorem line vs double integral?',
      content: 'I understand the algebraic equality ∮_C (P dx + Q dy) = ∬_D (∂Q/∂x - ∂P/∂y) dA, but could someone provide an intuitive geometric visualization for why summing microscopic circulation over D equals macroscopic circulation along the boundary?',
      courseCode: 'MATH-301',
      courseName: 'Multivariable Calculus',
      topic: 'Vector Calculus',
      authorName: 'Alex Mercer',
      authorRole: 'student',
      authorInitials: 'AM',
      timestamp: '4 hours ago',
      upvotes: 27,
      repliesCount: 5,
      isPinned: false,
      isInstructorAnswered: true,
      isBookmarked: false,
      isUpvoted: false,
      replies: [
        {
          id: 'rep-2a',
          authorName: 'Dr. Elena Rostova',
          authorRole: 'ta',
          authorInitials: 'ER',
          timestamp: '3 hours ago',
          content: 'Think of the domain D as a grid of tiny paddle wheels spinning with curl. Adjacent paddle wheels spin in opposite directions along internal borders, so their internal flows cancel out completely! The only flow left uncancelled is along the outer perimeter curve C.',
          isVerifiedAnswer: true,
          upvotes: 24,
        },
      ],
    },
    {
      id: 'th-3',
      title: 'Gauss’s Law cylindrical boundary condition for infinite charged wire',
      content: 'In Lecture 7, when deriving the electric field E = λ / (2πε₀r), why do the flat end-caps of the Gaussian cylinder contribute zero flux? Is it purely because E is orthogonal to the normal vectors of the caps?',
      courseCode: 'PHYS-201',
      courseName: 'General Physics & Electromagnetism',
      topic: 'Electrostatics',
      authorName: 'Marcus Vance',
      authorRole: 'student',
      authorInitials: 'MV',
      timestamp: '6 hours ago',
      upvotes: 15,
      repliesCount: 3,
      isPinned: false,
      isInstructorAnswered: true,
      isBookmarked: false,
      isUpvoted: false,
      replies: [
        {
          id: 'rep-3a',
          authorName: 'Prof. Jonathan Hayes',
          authorRole: 'instructor',
          authorInitials: 'JH',
          timestamp: '5 hours ago',
          content: 'Exactly correct, Marcus. By radial symmetry, E points purely outwards in the radial direction r̂. The cap surface normal vectors point in the ±ẑ direction. Since r̂ · ẑ = 0, E · dA = 0 over both end-caps.',
          isVerifiedAnswer: true,
          upvotes: 16,
        },
      ],
    },
    {
      id: 'th-4',
      title: 'Dijkstra vs A* heuristic admissibility on dense spatial road networks',
      content: 'When evaluating Euclidean distance as our heuristic h(n) on city street networks with varied speed limits, does A* remain admissible? Or does highway speed variation violate the triangle inequality for travel time?',
      courseCode: 'CS-210',
      courseName: 'Data Structures & Algorithms',
      topic: 'Graph Algorithms',
      authorName: 'David Kalu',
      authorRole: 'student',
      authorInitials: 'DK',
      timestamp: 'Yesterday',
      upvotes: 19,
      repliesCount: 4,
      isPinned: false,
      isInstructorAnswered: false,
      isBookmarked: true,
      isUpvoted: false,
      replies: [
        {
          id: 'rep-4a',
          authorName: 'Clara Oswald',
          authorRole: 'student',
          authorInitials: 'CO',
          timestamp: 'Yesterday',
          content: 'If your edge weights are travel times rather than physical distances, straight Euclidean distance is not directly admissible unless divided by the maximum speed in the entire network (h(n) = distance / max_speed).',
          upvotes: 12,
        },
      ],
    },
    {
      id: 'th-5',
      title: 'Problem Set 4 Question 3: Matrix exponential solution for coupled linear ODEs',
      content: 'Has anyone started question 3 on coupled oscillatory systems? I computed the eigenvalues λ = ±3i, but my eigenvector normalization is yielding complex constants that don’t match the initial condition at t=0.',
      courseCode: 'MATH-301',
      courseName: 'Multivariable Calculus',
      topic: 'Linear Systems',
      authorName: 'Maya Lin',
      authorRole: 'student',
      authorInitials: 'ML',
      timestamp: 'Yesterday',
      upvotes: 8,
      repliesCount: 2,
      isPinned: false,
      isInstructorAnswered: false,
      isBookmarked: false,
      isUpvoted: false,
      replies: [],
    },
  ]);

  readonly filteredThreads = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const course = this.selectedCourse();
    const filter = this.filterStatus();

    return this.threads().filter(t => {
      // Course filter
      if (course !== 'all' && t.courseCode !== course) {
        return false;
      }

      // Filter status
      if (filter === 'my' && t.authorName !== 'Alex Mercer') {
        return false;
      }
      if (filter === 'answered' && !t.isInstructorAnswered) {
        return false;
      }
      if (filter === 'open' && t.isInstructorAnswered) {
        return false;
      }
      if (filter === 'bookmarked' && !t.isBookmarked) {
        return false;
      }

      // Search query
      if (q) {
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchContent = t.content.toLowerCase().includes(q);
        const matchAuthor = t.authorName.toLowerCase().includes(q);
        const matchTopic = t.topic.toLowerCase().includes(q);
        return matchTitle || matchContent || matchAuthor || matchTopic;
      }

      return true;
    });
  });

  readonly pinnedThreads = computed(() => this.filteredThreads().filter(t => t.isPinned));
  readonly recentThreads = computed(() => this.filteredThreads().filter(t => !t.isPinned));

  readonly totalDiscussionsCount = computed(() => this.threads().length);
  readonly answeredCount = computed(() => this.threads().filter(t => t.isInstructorAnswered).length);
  readonly openCount = computed(() => this.threads().filter(t => !t.isInstructorAnswered).length);

  toggleUpvote(threadId: string, event: Event) {
    event.stopPropagation();
    this.threads.update(list =>
      list.map(t => {
        if (t.id === threadId) {
          const isUp = !t.isUpvoted;
          return {
            ...t,
            isUpvoted: isUp,
            upvotes: isUp ? t.upvotes + 1 : t.upvotes - 1,
          };
        }
        return t;
      })
    );
  }

  toggleBookmark(threadId: string, event: Event) {
    event.stopPropagation();
    this.threads.update(list =>
      list.map(t => {
        if (t.id === threadId) {
          return { ...t, isBookmarked: !t.isBookmarked };
        }
        return t;
      })
    );
  }

  openAskModal() {
    this.newTitle.set('');
    this.newTopic.set('');
    this.newContent.set('');
    this.isAskModalOpen.set(true);
  }

  closeAskModal() {
    this.isAskModalOpen.set(false);
  }

  submitQuestion() {
    if (!this.newTitle().trim() || !this.newContent().trim()) return;

    const courseObj = this.coursesList().find(c => c.code === this.newCourseCode());
    const newThread: ForumThread = {
      id: 'th-' + Date.now(),
      title: this.newTitle().trim(),
      content: this.newContent().trim(),
      courseCode: this.newCourseCode(),
      courseName: courseObj ? courseObj.name : 'Multivariable Calculus',
      topic: this.newTopic().trim() || 'General Inquiry',
      authorName: 'Alex Mercer',
      authorRole: 'student',
      authorInitials: 'AM',
      timestamp: 'Just now',
      upvotes: 1,
      repliesCount: 0,
      isPinned: false,
      isInstructorAnswered: false,
      isBookmarked: false,
      isUpvoted: true,
      replies: [],
    };

    this.threads.update(curr => [newThread, ...curr]);
    this.closeAskModal();
  }

  openThreadDetail(thread: ForumThread) {
    this.selectedThread.set(thread);
    this.newReplyContent.set('');
  }

  closeThreadDetail() {
    this.selectedThread.set(null);
  }

  postReply() {
    const thread = this.selectedThread();
    const content = this.newReplyContent().trim();
    if (!thread || !content) return;

    const newRep: ForumReply = {
      id: 'rep-' + Date.now(),
      authorName: 'Alex Mercer',
      authorRole: 'student',
      authorInitials: 'AM',
      timestamp: 'Just now',
      content: content,
      upvotes: 0,
    };

    const updatedReplies = [...(thread.replies || []), newRep];
    const updatedThread: ForumThread = {
      ...thread,
      replies: updatedReplies,
      repliesCount: updatedReplies.length,
    };

    this.threads.update(list =>
      list.map(t => (t.id === thread.id ? updatedThread : t))
    );

    this.selectedThread.set(updatedThread);
    this.newReplyContent.set('');
  }
}
