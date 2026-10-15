import { Component, computed, inject, signal, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZardDialogImports, ZardDialogRef, ZardDialogService } from '@/shared/components/dialog';

export interface DiscussionThread {
  id: string;
  author: string;
  avatar: string;
  title: string;
  time: string;
  replies: number;
  unreadCount?: number;
  hasInstructorReply: boolean;
  snippet: string;
  pinned?: boolean;
  module?: string;
}

@Component({
  imports: [FormsModule, ZardDialogImports],
  selector: 'app-discussion',
  styleUrl: './discussion.css',
  templateUrl: './discussion.html',
})
export default class Discussion {
  private readonly dialogService = inject(ZardDialogService);
  private dialogRef: ZardDialogRef<any> | null = null;

  // Search & Filter state
  readonly searchQuery = signal('');
  readonly filterStatus = signal<'all' | 'answered' | 'open'>('all');
  readonly unreadOnly = signal(false);

  // New question form state
  readonly newPostTitle = signal('');
  readonly newPostContent = signal('');
  readonly newPostModule = signal('General Course Q&A');
  readonly notifyReplies = signal(true);

  readonly modules = [
    'General Course Q&A',
    'Module 1: Multivariable Functions & Limits',
    'Module 2: Partial Derivatives & Chain Rule',
    'Module 3: Double & Triple Integrals',
    'Module 4: Vector Fields & Line Integrals',
  ];

  readonly threads = signal<DiscussionThread[]>([
    {
      id: 'disc-pin-1',
      author: 'Dr. Evelyn Reed (Instructor)',
      avatar: 'https://i.pravatar.cc/150?u=evelyn',
      title: 'Official MATH-204 Office Hours Schedule & Midterm Review Guidelines',
      time: 'Posted 2 days ago',
      replies: 14,
      unreadCount: 3,
      hasInstructorReply: true,
      pinned: true,
      module: 'General Course Q&A',
      snippet: 'Welcome to Section B! Office hours are held Tuesdays & Thursdays from 2:00 PM to 4:00 PM in Science Hall 302 or on Zoom. Review study materials for Taylor series.',
    },
    {
      id: 'disc-1',
      author: 'Maya Lin',
      avatar: 'https://i.pravatar.cc/150?u=maya',
      title: 'Question regarding Problem 4 on the Polar Coordinates Problem Set',
      time: '3 hours ago',
      replies: 5,
      unreadCount: 2,
      hasInstructorReply: true,
      pinned: false,
      module: 'Module 3: Double & Triple Integrals',
      snippet: 'When switching the bounds from Cartesian to polar, did anyone else find that the upper limit for r had to be split into two separate piecewise integrals?',
    },
    {
      id: 'disc-2',
      author: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?u=david',
      title: 'Study group for Quiz 3 Taylor Series tonight (Discord / Room B)',
      time: '5 hours ago',
      replies: 8,
      unreadCount: 0,
      hasInstructorReply: false,
      pinned: false,
      module: 'Module 1: Multivariable Functions & Limits',
      snippet: 'We are hosting a quick peer review session at 7 PM in Live Room B to walk through convergence radius calculations. Everyone is welcome!',
    },
    {
      id: 'disc-3',
      author: 'Sarah Jenkins',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      title: 'Geometric interpretation of conservative fields vs curl = 0',
      time: 'Yesterday',
      replies: 3,
      unreadCount: 0,
      hasInstructorReply: true,
      pinned: false,
      module: 'Module 4: Vector Fields & Line Integrals',
      snippet: 'Can someone explain why simply having curl F = 0 is not sufficient for a field to be conservative if the domain is not simply connected?',
    },
  ]);

  readonly filteredThreads = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const filter = this.filterStatus();
    const unread = this.unreadOnly();

    return this.threads().filter(thread => {
      if (q && !thread.title.toLowerCase().includes(q) && !thread.snippet.toLowerCase().includes(q)) {
        return false;
      }
      if (filter === 'answered' && !thread.hasInstructorReply) return false;
      if (filter === 'open' && thread.hasInstructorReply) return false;
      if (unread && (!thread.unreadCount || thread.unreadCount === 0)) return false;
      return true;
    });
  });

  readonly pinnedThreads = computed(() => {
    return this.filteredThreads().filter(t => t.pinned);
  });

  readonly recentThreads = computed(() => {
    return this.filteredThreads().filter(t => !t.pinned);
  });

  openNewQuestionModal(template: TemplateRef<any>) {
    this.dialogRef = this.dialogService.create({
      zTitle: 'Ask a Question',
      zContent: template,
      zHideFooter: true,
      zWidth: 'md',
    });
  }

  closeNewQuestionModal() {
    this.dialogRef?.close();
    this.dialogRef = null;
  }

  createDiscussion() {
    const title = this.newPostTitle().trim();
    if (!title) return;

    this.threads.update(posts => [
      {
        id: 'disc-' + (posts.length + 1),
        author: 'Alex Morgan (You)',
        avatar: 'https://i.pravatar.cc/150?u=alex',
        title,
        time: 'Just now',
        replies: 0,
        unreadCount: 0,
        hasInstructorReply: false,
        pinned: false,
        module: this.newPostModule(),
        snippet: this.newPostContent().trim() || 'No preview available.',
      },
      ...posts,
    ]);

    this.newPostTitle.set('');
    this.newPostContent.set('');
    this.closeNewQuestionModal();
  }
}
