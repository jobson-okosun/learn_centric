import { Component, signal, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Menu {
  label: string;
  routerLink?: string;
  children: Menu[];
} 

@Component({
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  selector: 'app-navigation',
  styleUrl: './navigation.css',
  templateUrl: './navigation.html',
})
export class Navigation {
  private router = inject(Router);

  readonly isLearner = signal<boolean>(typeof window !== 'undefined' ? window.location.pathname.startsWith('/learn') : false);

  readonly instructorMenus: Menu[] = [
    { label: 'dashboard', routerLink: '/app/dashboard', children: [] },
    {
      label: 'teachings',
      children: [
        { label: 'courses', routerLink: '/app/teachings/courses', children: [] },
        { label: 'classes', routerLink: '/app/teachings/classes', children: [] },
        { label: 'learning-paths', routerLink: '/app/teachings/learning-paths', children: [] },
      ],
    },
    { label: 'content', routerLink: '/app/content', children: [] },
    {
      label: 'students',
      children: [
        { label: 'directory', routerLink: '/app/students/directory', children: [] },
        { label: 'groups', routerLink: '/app/students/groups', children: [] },
      ],
    },
    {
      label: 'assessment',
      children: [
        { label: 'question-bank', routerLink: '/app/assessment/questions-bank', children: [] },
        { label: 'exams & quiz', routerLink: '/app/assessment/exams-quizzes', children: [] },
        { label: 'rubrics', routerLink: '/app/assessment/rubrics', children: [] },
      ],
    },
    {
      label: 'classroom',
      children: [
        { label: 'sessions', routerLink: '/app/classroom/sessions', children: [] },
        { label: 'calendar', routerLink: '/app/classroom/calendar', children: [] },
        { label: 'attendance', routerLink: '/app/classroom/attendance', children: [] },
      ],
    },
    {
      label: 'communication',
      children: [
        { label: 'inbox', routerLink: '/app/communication/inbox', children: [] },
        { label: 'announcements', routerLink: '/app/communication/announcements', children: [] },
        { label: 'groups', routerLink: '/app/communication/groups', children: [] },
      ],
    },
    {
      label: 'insights',
      children: [
        { label: 'class', routerLink: '/app/insights/class', children: [] },
        { label: 'mastery', routerLink: '/app/insights/mastery', children: [] },
        { label: 'assessments', routerLink: '/app/insights/assessments', children: [] },
        { label: 'students', routerLink: '/app/insights/students', children: [] },
        { label: 'AI insights', routerLink: '/app/insights/ai-insights', children: [] },
      ],
    },
  ];

  readonly learnerMenus: Menu[] = [
    { label: 'home', routerLink: '/learn/home', children: [] },
    { label: 'courses', routerLink: '/learn/courses', children: [] },
    {
      label: 'classroom',
      children: [
        { label: 'sessions', routerLink: '/learn/classroom/sessions', children: [] },
        { label: 'classes', routerLink: '/learn/classroom/classes', children: [] },
        { label: 'calendar', routerLink: '/learn/classroom/calendar', children: [] },
        { label: 'attendance', routerLink: '/learn/classroom/attendance', children: [] },
      ],
    },
    { label: 'practice', routerLink: '/learn/practice', children: [] },
    { label: 'assessments', routerLink: '/learn/assessments', children: [] },
    { label: 'discussions', routerLink: '/learn/discussions', children: [] },
    { label: 'AI tutor', routerLink: '/learn/tutor', children: [] },
  ];

  readonly menus = computed<Menu[]>(() => {
    return this.isLearner() ? this.learnerMenus : this.instructorMenus;
  });

  expandedMenus = signal<string[]>([]);

  constructor() {
    this.expandActiveMenu();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || this.router.url;
      this.isLearner.set(url.startsWith('/learn'));
      this.expandActiveMenu();
    });
  }

  toggleMenu(label: string): void {
    this.expandedMenus.update(menus =>
      menus.includes(label) ? [] : [label]
    );
  }


  private expandActiveMenu(): void {
    const url = this.router.url;
    
    for (const menu of this.menus()) {
      if (menu.children.length > 0) {
        const isActive = menu.children.some(child => child.routerLink && url.includes(child.routerLink));
        if (isActive) {
          if (!this.expandedMenus().includes(menu.label)) {
            this.expandedMenus.set([menu.label]);
          }
          return;
        }
      }
    }
    
    this.expandedMenus.set([]);
  }
}
