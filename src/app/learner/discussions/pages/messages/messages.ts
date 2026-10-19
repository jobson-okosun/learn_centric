import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: 'instructor' | 'ta' | 'student';
  content: string;
  time: string;
  isSelf: boolean;
}

export interface Conversation {
  id: string;
  contactName: string;
  contactRole: 'instructor' | 'ta' | 'peer';
  contactInitials: string;
  courseContext: string;
  topicContext: string;
  preview: string;
  time: string;
  unread: boolean;
  isOnline: boolean;
  messages: ChatMessage[];
}

@Component({
  imports: [FormsModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export default class Messages {
  readonly searchQuery = signal('');
  readonly activeFilter = signal<'all' | 'unread'>('all');
  readonly activeConversationId = signal<string>('conv-1');

  // New Chat modal
  readonly isNewMessageModalOpen = signal(false);
  readonly newRecipientCourse = signal('MATH-301');
  readonly newRecipientPerson = signal('Prof. Jonathan Hayes');
  readonly newTopicSubject = signal('');
  readonly newInitialMessage = signal('');

  // Draft reply input for active thread
  readonly draftReply = signal('');

  readonly instructorDirectory = signal([
    { name: 'Prof. Jonathan Hayes', role: 'instructor' as const, course: 'MATH-301 · Multivariable Calculus' },
    { name: 'Dr. Elena Rostova', role: 'ta' as const, course: 'MATH-301 · Multivariable Calculus' },
    { name: 'Dr. Marcus Vance', role: 'instructor' as const, course: 'PHYS-201 · General Physics' },
    { name: 'Dr. Robert Thorne', role: 'instructor' as const, course: 'CS-210 · Data Structures' },
  ]);

  readonly conversations = signal<Conversation[]>([
    {
      id: 'conv-1',
      contactName: 'Prof. Jonathan Hayes',
      contactRole: 'instructor',
      contactInitials: 'JH',
      courseContext: 'MATH-301',
      topicContext: 'Midterm Accommodations',
      preview: 'Yes Alex, the formula sheet in the test runner contains the divergence theorem identities.',
      time: '11:20 AM',
      unread: true,
      isOnline: true,
      messages: [
        {
          id: 'm1',
          senderName: 'Alex Mercer',
          senderRole: 'student',
          content: 'Hello Professor Hayes, will the official midterm formula sheet include the vector calculus coordinate transformations for cylindrical and spherical coordinates?',
          time: '10:45 AM',
          isSelf: true,
        },
        {
          id: 'm2',
          senderName: 'Prof. Jonathan Hayes',
          senderRole: 'instructor',
          content: 'Yes Alex, the formula sheet in the test runner contains the divergence theorem identities and cylindrical coordinate conversions. You do not need to memorize the Jacobians for those standard changes of variables.',
          time: '11:20 AM',
          isSelf: false,
        },
      ],
    },
    {
      id: 'conv-2',
      contactName: 'Dr. Elena Rostova',
      contactRole: 'ta',
      contactInitials: 'ER',
      courseContext: 'MATH-301',
      topicContext: 'Problem Set 4 Question 3',
      preview: 'Check your eigenvalue calculation again. The complex conjugate pair should have zero real part.',
      time: 'Yesterday',
      unread: false,
      isOnline: false,
      messages: [
        {
          id: 'm3',
          senderName: 'Alex Mercer',
          senderRole: 'student',
          content: 'Hi Dr. Rostova, for PS4 problem 3, I am getting eigenvalues with real part 1.5, which causes exponential explosion instead of periodic oscillation. Is that expected?',
          time: 'Yesterday, 3:15 PM',
          isSelf: true,
        },
        {
          id: 'm4',
          senderName: 'Dr. Elena Rostova',
          senderRole: 'ta',
          content: 'Check your eigenvalue calculation again. The damping coefficient is zero in this problem, so the characteristic roots must be pure imaginary ±3i. If you have a positive real part, check your trace sign in det(A - λI).',
          time: 'Yesterday, 4:02 PM',
          isSelf: false,
        },
      ],
    },
    {
      id: 'conv-3',
      contactName: 'Dr. Robert Thorne',
      contactRole: 'instructor',
      contactInitials: 'RT',
      courseContext: 'CS-210',
      topicContext: 'Project 2 Submission',
      preview: 'Your unit test suite looks solid. You are approved to use the Fibonacci heap extension.',
      time: 'Oct 13',
      unread: false,
      isOnline: true,
      messages: [
        {
          id: 'm5',
          senderName: 'Alex Mercer',
          senderRole: 'student',
          content: 'Dr. Thorne, for the Dijkstra optimization bonus, may we implement a 4-ary heap or Fibonacci heap?',
          time: 'Oct 13, 1:10 PM',
          isSelf: true,
        },
        {
          id: 'm6',
          senderName: 'Dr. Robert Thorne',
          senderRole: 'instructor',
          content: 'Your unit test suite looks solid. You are approved to use the Fibonacci heap extension. Just document the amortized runtime bounds in your README.',
          time: 'Oct 13, 2:40 PM',
          isSelf: false,
        },
      ],
    },
  ]);

  readonly activeConversation = computed(() => {
    return this.conversations().find(c => c.id === this.activeConversationId()) || this.conversations()[0] || null;
  });

  readonly filteredConversations = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const filter = this.activeFilter();

    return this.conversations().filter(c => {
      if (filter === 'unread' && !c.unread) {
        return false;
      }
      if (q) {
        const matchName = c.contactName.toLowerCase().includes(q);
        const matchCourse = c.courseContext.toLowerCase().includes(q);
        const matchTopic = c.topicContext.toLowerCase().includes(q);
        const matchPreview = c.preview.toLowerCase().includes(q);
        return matchName || matchCourse || matchTopic || matchPreview;
      }
      return true;
    });
  });

  selectConversation(id: string) {
    this.activeConversationId.set(id);
    this.conversations.update(list =>
      list.map(c => (c.id === id ? { ...c, unread: false } : c))
    );
  }

  sendMessage() {
    const text = this.draftReply().trim();
    const active = this.activeConversation();
    if (!text || !active) return;

    const newMsg: ChatMessage = {
      id: 'm-' + Date.now(),
      senderName: 'Alex Mercer',
      senderRole: 'student',
      content: text,
      time: 'Just now',
      isSelf: true,
    };

    this.conversations.update(list =>
      list.map(c => {
        if (c.id === active.id) {
          return {
            ...c,
            preview: text,
            time: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    this.draftReply.set('');
  }

  openNewMessageModal() {
    this.newTopicSubject.set('');
    this.newInitialMessage.set('');
    this.isNewMessageModalOpen.set(true);
  }

  closeNewMessageModal() {
    this.isNewMessageModalOpen.set(false);
  }

  startNewConversation() {
    const person = this.newRecipientPerson();
    const text = this.newInitialMessage().trim();
    const topic = this.newTopicSubject().trim() || 'General Inquiry';
    if (!person || !text) return;

    const dirEntry = this.instructorDirectory().find(d => d.name === person);
    const initials = person
      .split(' ')
      .filter((_, i, arr) => i === 0 || i === arr.length - 1)
      .map(p => p[0])
      .join('');

    const newId = 'conv-' + Date.now();
    const newConv: Conversation = {
      id: newId,
      contactName: person,
      contactRole: dirEntry ? (dirEntry.role as any) : 'instructor',
      contactInitials: initials,
      courseContext: this.newRecipientCourse(),
      topicContext: topic,
      preview: text,
      time: 'Just now',
      unread: false,
      isOnline: true,
      messages: [
        {
          id: 'm-' + Date.now(),
          senderName: 'Alex Mercer',
          senderRole: 'student',
          content: text,
          time: 'Just now',
          isSelf: true,
        },
      ],
    };

    this.conversations.update(list => [newConv, ...list]);
    this.activeConversationId.set(newId);
    this.closeNewMessageModal();
  }
}
