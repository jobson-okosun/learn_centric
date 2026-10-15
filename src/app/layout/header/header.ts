import { Component, inject, signal, computed, viewChild, TemplateRef } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LayoutService } from '../../core/services/layout.service';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';

interface ClassPreview {
  code: string;
  title: string;
  instructor: string;
  cohort: string;
}

@Component({
  imports: [RouterLink, FormsModule, ZardDialogImports],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);
  private readonly dialogService = inject(ZardDialogService);

  readonly isLearner = signal<boolean>(
    typeof window !== 'undefined' ? window.location.pathname.startsWith('/learn') : false
  );

  readonly searchPlaceholder = computed(() =>
    this.isLearner()
      ? 'Search courses, practice, tutor...'
      : 'Search content, classes, students...'
  );

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

