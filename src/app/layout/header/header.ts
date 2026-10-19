import { Component, inject, signal, computed, viewChild, TemplateRef } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LayoutService } from '../../core/services/layout.service';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { LiveStageModal } from '../../learner/classroom/components/live-stage/live-stage';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  category: 'grade' | 'assignment' | 'live' | 'discussion' | 'system' | 'submission';
  read: boolean;
  link?: string;
  badge?: string;
  priority?: 'urgent' | 'normal';
}

interface ClassPreview {
  code: string;
  title: string;
  instructor: string;
  cohort: string;
}

@Component({
  imports: [RouterLink, FormsModule, ZardDialogImports, ZardDropdownImports],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);
  private readonly dialogService = inject(ZardDialogService);

  readonly activeNotificationFilter = signal<'all' | 'unread' | 'urgent'>('all');

  readonly learnerNotifications = signal<AppNotification[]>([
    {
      id: 'ln-1',
      title: 'Physics 201 Midterm Grade Released',
      message: 'Dr. Marcus Vance published your Midterm Exam score: 94/100 (Grade A).',
      time: '15m ago',
      category: 'grade',
      read: false,
      badge: 'Grade',
      link: '/learn/courses/phys-201/gradebook',
    },
    {
      id: 'ln-2',
      title: 'Calculus Problem Set 4 Due Soon',
      message: 'Vector Integrals assignment is due tonight at 11:59 PM. 2 questions remaining.',
      time: '1h ago',
      category: 'assignment',
      read: true,
      badge: 'Deadline',
      priority: 'urgent',
      link: '/learn/courses/math-301/assignments',
    },
    {
      id: 'ln-3',
      title: 'Live Lecture Stage Starting Now',
      message: 'Prof. Evelyn Reed has opened the live stage for "Differential Forms & Stokes Theorem".',
      time: '2h ago',
      category: 'live',
      read: true,
      badge: 'Live Stage',
      priority: 'urgent',
      link: '/learn/classroom/sessions',
    },
    {
      id: 'ln-4',
      title: 'Reply in Computer Systems Forum',
      message: 'TA Alex Chen tagged you in "Cache line indexing calculation": "Check theorem 4.2 in lecture notes".',
      time: '5h ago',
      category: 'discussion',
      read: true,
      badge: 'Discussion',
      link: '/learn/discussions/forum',
    },
    {
      id: 'ln-5',
      title: 'Weekly Socratic Practice Drill Ready',
      message: 'AI Tutor has generated a personalized 5-question mastery drill based on your recent physics queries.',
      time: 'Yesterday',
      category: 'system',
      read: true,
      badge: 'AI Tutor',
      link: '/learn/practice',
    },
  ]);

  readonly instructorNotifications = signal<AppNotification[]>([
    {
      id: 'in-1',
      title: '18 New Submissions Received',
      message: 'Classical Mechanics Quiz 3 has 18 new student submissions awaiting rubric evaluation.',
      time: '10m ago',
      category: 'submission',
      read: false,
      badge: 'Assessment',
      link: '/app/assessment/exams-quizzes',
    },
    {
      id: 'in-2',
      title: 'Student in Office Hours Queue',
      message: 'David Miller (CS-210) joined your Virtual Office Hours waiting room.',
      time: '35m ago',
      category: 'live',
      read: false,
      badge: 'Office Hours',
      priority: 'urgent',
      link: '/app/classroom',
    },
    {
      id: 'in-3',
      title: 'Attendance Deficit Warning',
      message: '3 students in PHYS-201 Section B dropped below the 80% minimum attendance threshold.',
      time: '2h ago',
      category: 'system',
      read: false,
      badge: 'Attendance Flag',
      priority: 'urgent',
      link: '/app/students',
    },
    {
      id: 'in-4',
      title: 'Assignment Extension Request',
      message: 'Elena Rostova submitted a medical extension request for Assignment 4.',
      time: '4h ago',
      category: 'discussion',
      read: true,
      badge: 'Direct Message',
      link: '/app/communication',
    },
    {
      id: 'in-5',
      title: 'Copyleaks Plagiarism Scan Complete',
      message: 'All 42 submissions for Midterm Lab Report processed successfully. 0 high-risk matches flagged.',
      time: 'Yesterday',
      category: 'grade',
      read: true,
      badge: 'Integrity',
      link: '/app/rubrics',
    },
  ]);

  readonly adminNotifications = signal<AppNotification[]>([
    {
      id: 'an-1',
      title: 'Course Publish Approval Awaiting Review',
      message: 'Dr. Evelyn Reed submitted "Quantum Mechanics III" for institutional syllabus accreditation.',
      time: '25m ago',
      category: 'system',
      read: false,
      badge: 'Accreditation',
      priority: 'urgent',
      link: '/app/teachings/courses',
    },
    {
      id: 'an-2',
      title: 'Unstaffed Class Cohort Alert',
      message: 'Differential Equations Section B starts in 5 days with 48 enrolled learners and no assigned lead faculty.',
      time: '1h ago',
      category: 'system',
      read: false,
      badge: 'Staffing Flag',
      priority: 'urgent',
      link: '/admin/enrolments/classes',
    },
    {
      id: 'an-3',
      title: 'Enrolment Capacity Bottleneck (>95%)',
      message: 'Foundations of Computer Systems has reached 98% capacity (196/200 maximum capacity).',
      time: '3h ago',
      category: 'system',
      read: false,
      badge: 'Capacity',
      link: '/admin/enrolments/classes',
    },
    {
      id: 'an-4',
      title: 'Grade Appeal Escalation',
      message: 'Learner Marcus Chen submitted formal appeal on Midterm Exam score; instructor review window expired.',
      time: '5h ago',
      category: 'grade',
      read: true,
      badge: 'Appeal',
      link: '/admin/reports/broadsheet',
    },
    {
      id: 'an-5',
      title: 'Attendance Deficit Risk Threshold',
      message: '14 learners in Faculty of Engineering dropped below the institutional 75% attendance threshold.',
      time: 'Yesterday',
      category: 'system',
      read: true,
      badge: 'Compliance',
      link: '/admin/reports/compliance',
    },
  ]);

  readonly notifications = computed(() => {
    if (this.isAdmin()) return this.adminNotifications();
    if (this.isLearner()) return this.learnerNotifications();
    return this.instructorNotifications();
  });

  readonly unreadCount = computed(() =>
    this.notifications().filter((n) => !n.read).length
  );

  readonly filteredNotifications = computed(() => {
    const filter = this.activeNotificationFilter();
    const list = this.notifications();
    if (filter === 'unread') {
      return list.filter((n) => !n.read);
    }
    if (filter === 'urgent') {
      return list.filter((n) => n.priority === 'urgent');
    }
    return list;
  });

  markAsRead(id: string): void {
    const updater = (list: AppNotification[]) =>
      list.map((n) => (n.id === id ? { ...n, read: true } : n));
    if (this.isAdmin()) {
      this.adminNotifications.update(updater);
    } else if (this.isLearner()) {
      this.learnerNotifications.update(updater);
    } else {
      this.instructorNotifications.update(updater);
    }
  }

  markAllAsRead(): void {
    const updater = (list: AppNotification[]) =>
      list.map((n) => ({ ...n, read: true }));
    if (this.isAdmin()) {
      this.adminNotifications.update(updater);
    } else if (this.isLearner()) {
      this.learnerNotifications.update(updater);
    } else {
      this.instructorNotifications.update(updater);
    }
  }

  removeNotification(id: string, event?: Event): void {
    event?.stopPropagation();
    const updater = (list: AppNotification[]) =>
      list.filter((n) => n.id !== id);
    if (this.isAdmin()) {
      this.adminNotifications.update(updater);
    } else if (this.isLearner()) {
      this.learnerNotifications.update(updater);
    } else {
      this.instructorNotifications.update(updater);
    }
  }

  clearAllNotifications(): void {
    if (this.isAdmin()) {
      this.adminNotifications.set([]);
    } else if (this.isLearner()) {
      this.learnerNotifications.set([]);
    } else {
      this.instructorNotifications.set([]);
    }
  }

  handleNotificationClick(notification: AppNotification): void {
    this.markAsRead(notification.id);
    if (this.isLearner() && notification.category === 'live') {
      this.dialogService.create({
        zContent: LiveStageModal,
        zHideHeader: true,
        zHideFooter: true,
        zMaskClosable: false,
        zCustomClasses: 'h-[98vh] min-w-[calc(100vw-1rem)] !p-0 overflow-hidden rounded-2xl flex flex-col bg-white',
      });
      return;
    }
    if (notification.link) {
      this.router.navigateByUrl(notification.link);
    }
  }

  readonly isAdmin = signal<boolean>(
    typeof window !== 'undefined' ? window.location.pathname.startsWith('/admin') : false
  );

  readonly isLearner = signal<boolean>(
    typeof window !== 'undefined' ? window.location.pathname.startsWith('/learn') : false
  );

  readonly searchPlaceholder = computed(() => {
    if (this.isAdmin()) return 'Search users, org units, classes, logs...';
    if (this.isLearner()) return 'Search courses, practice, tutor...';
    return 'Search content, classes, students...';
  });

  joinClassTemplate = viewChild<TemplateRef<any>>('joinClassTemplate');
  activeDialogRef: ZardDialogRef<any> | null = null;

  joinCode = signal('');
  isEnrolling = signal(false);
  enrollSuccess = signal(false);

  readonly classMatch = computed<ClassPreview | null>(() => {
    const code = this.joinCode().trim().toUpperCase();
    if (code.length < 5) return null;

    if (code.includes('MTH') || code.includes('CALC') || code.includes('MATH')) {
      return {
        code,
        title: 'Advanced Calculus & Linear Algebra',
        instructor: 'Dr. Evelyn Reed',
        cohort: 'Spring 2026 • Cohort B',
      };
    }

    if (code.includes('BIO') || code.includes('SCI')) {
      return {
        code,
        title: 'General Biology & Genetics',
        instructor: 'Dr. Marcus Vance',
        cohort: 'Spring 2026 • Cohort A',
      };
    }

    if (code.includes('CS') || code.includes('PROG') || code.includes('CODE')) {
      return {
        code,
        title: 'Foundations of Computer Systems',
        instructor: 'Prof. Sarah Jenkins',
        cohort: 'Fall 2026 • Section 1',
      };
    }

    return {
      code,
      title: 'Introduction to Modern Physics',
      instructor: 'Dr. Alexander Hayes',
      cohort: '2026 Academic Year',
    };
  });

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || this.router.url;
        this.isAdmin.set(url.startsWith('/admin'));
        this.isLearner.set(url.startsWith('/learn'));
      });
  }

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  openJoinClassModal(): void {
    const template = this.joinClassTemplate();
    if (!template) return;

    this.joinCode.set('');
    this.enrollSuccess.set(false);
    this.isEnrolling.set(false);

    this.activeDialogRef = this.dialogService.create({
      zTitle: 'Join a Class',
      zContent: template,
      zHideFooter: true,
      zCustomClasses: '!max-w-md w-full',
    });
  }

  onCodeChange(value: string): void {
    const clean = value.replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
    this.joinCode.set(clean);
  }

  submitJoinClass(): void {
    if (!this.classMatch() || this.isEnrolling()) return;

    this.isEnrolling.set(true);
    setTimeout(() => {
      this.isEnrolling.set(false);
      this.enrollSuccess.set(true);

      setTimeout(() => {
        this.activeDialogRef?.close();
        this.router.navigate(['/learn/courses']);
      }, 1200);
    }, 800);
  }

  closeDialog(): void {
    this.activeDialogRef?.close();
  }
}

