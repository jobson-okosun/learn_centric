import { Component, computed, signal, inject, TemplateRef } from '@angular/core';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';

interface Author {
  name: string;
  avatar: string;
  role: 'instructor' | 'student';
}

interface Thread {
  id: string;
  title: string;
  author: Author;
  content: string;
  timestamp: string;
  isAnnouncement: boolean;
  isPinned: boolean;
  status: 'open' | 'closed';
  replyCount: number;
  unreadCount: number;
}

@Component({
  selector: 'app-discussions',
  imports: [ZardDialogImports],
  templateUrl: './discussions.html',
  styleUrl: './discussions.css'
})
export default class Discussions {
  private dialogService = inject(ZardDialogService);
  private dialogRef: ZardDialogRef<any> | null = null;
  threads = signal<Thread[]>([
    {
      id: '1',
      title: 'Course Q&A and General Announcements',
      author: {
        name: 'Dr. Sarah Jenkins',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=4F46E5&color=fff',
        role: 'instructor'
      },
      content: 'Got a question about the syllabus, assignments, or general course logistics? Ask it here! Other students can chime in, and I will answer as well. Announcements will also be posted here.',
      timestamp: 'Created Sep 1',
      isAnnouncement: true,
      isPinned: true,
      status: 'open',
      replyCount: 42,
      unreadCount: 5
    },
    {
      id: '2',
      title: 'Introductions',
      author: {
        name: 'Dr. Sarah Jenkins',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=4F46E5&color=fff',
        role: 'instructor'
      },
      content: 'Please take a moment to introduce yourself to the class! Share where you are from, your major, and one fun fact about yourself.',
      timestamp: 'Created Sep 2',
      isAnnouncement: false,
      isPinned: true,
      status: 'open',
      replyCount: 156,
      unreadCount: 0
    },
    {
      id: '3',
      title: 'Question regarding Assignment 1 requirements',
      author: {
        name: 'Alex Johnson',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=E11D48&color=fff',
        role: 'student'
      },
      content: 'Hi everyone, for the first assignment, are we supposed to include a bibliography even if we only reference the primary textbook?',
      timestamp: 'Last post 5 hours ago',
      isAnnouncement: false,
      isPinned: false,
      status: 'open',
      replyCount: 3,
      unreadCount: 1
    },
    {
      id: '4',
      title: 'Study group for midterms',
      author: {
        name: 'Sam Smith',
        avatar: 'https://ui-avatars.com/api/?name=Sam+Smith&background=10B981&color=fff',
        role: 'student'
      },
      content: 'Hey guys, I was wondering if anyone wants to form a study group for the upcoming midterms? We could meet on Zoom on Tuesdays.',
      timestamp: 'Last post 1 hour ago',
      isAnnouncement: false,
      isPinned: false,
      status: 'open',
      replyCount: 8,
      unreadCount: 3
    }
  ]);

  pinnedThreads = computed(() => this.threads().filter(t => t.isPinned));
  recentThreads = computed(() => this.threads().filter(t => !t.isPinned));

  openNewDiscussionModal(template: TemplateRef<any>) {
    this.dialogRef = this.dialogService.create({
      zTitle: 'Start a New Discussion',
      zContent: template,
      zHideFooter: true,
      zWidth: 'md',
    });
  }

  closeNewDiscussionModal() {
    this.dialogRef?.close();
  }
}
