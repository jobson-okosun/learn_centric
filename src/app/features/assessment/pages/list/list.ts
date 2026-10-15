import { Component, signal, viewChild, TemplateRef, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ZardNavigationMenuComponent, ZardNavigationMenuImports } from '@/shared/components/navigation-menu';
import { ZardDialogService } from '@/shared/components/dialog';
import { ZardComboboxComponent } from '@/shared/components/combobox';
import { ZardSwitchComponent } from '@/shared/components/switch';
import { ZardSelectImports } from '@/shared/components/select';

interface Assessment {
  id: string;
  title: string;
  course: string;
  type: string;
  status: 'Published' | 'Draft' | 'Closed';
  startAt?: Date;
  dueAt?: Date;
  submissions: number;
  totalStudents: number;
}

@Component({
  imports: [RouterLink, DatePipe, DecimalPipe, ZardNavigationMenuComponent, ZardNavigationMenuImports, ZardComboboxComponent, ZardSwitchComponent, ZardSelectImports],
  selector: 'app-list',
  styleUrl: './list.css',
  templateUrl: './list.html',
})
export default class List {
  private readonly dialog = inject(ZardDialogService);
  private readonly router = inject(Router);

  quizModal = viewChild.required<TemplateRef<any>>('createQuizModal');
  examModal = viewChild.required<TemplateRef<any>>('createExamModal');
  activeDialogRef?: any;

  openDialog(template: TemplateRef<any>, title: string) {
    this.activeDialogRef = this.dialog.create({
      zTitle: title,
      zContent: template,
      zHideFooter: true,
      zCustomClasses: '!max-w-lg w-full',
    });
  }

  assigneeOptions = signal<{label: string, value: string}[]>([
    { label: 'Biology 201 - Section A', value: 'bio201-a' },
    { label: 'Physics 102 - Fall Cohort', value: 'phy102' },
    { label: 'Group: Study Group 1', value: 'g-1' },
    { label: 'Group: Study Group 2', value: 'g-2' },
  ]);

  courseOptions = signal<{label: string, value: string}[]>([
    { label: 'Biology 201 - Section A', value: 'bio201-a' },
    { label: 'Physics 102 - Fall Cohort', value: 'phy102' },
    { label: 'Computer Science 101', value: 'cs101' },
  ]);

  openQuizModal() { this.openDialog(this.quizModal(), 'Create Quiz'); }
  openExamModal() { this.openDialog(this.examModal(), 'Create Exam'); }

  closeDialog() {
    this.activeDialogRef?.close();
  }

  createAssessment() {
    this.closeDialog();
    // In a real app we'd create the record first, then redirect to the details page of the new record.
    this.router.navigate(['/app/assessment/details/new']);
  }
  assessments = signal<Assessment[]>([
    {
      id: '1',
      title: 'Midterm Exam - Biology',
      course: 'Biology 201 - Section A',
      type: 'Exam',
      status: 'Published',
      startAt: new Date('2026-10-15T08:00:00'),
      dueAt: new Date('2026-10-15T10:00:00'),
      submissions: 42,
      totalStudents: 45
    },
    {
      id: '2',
      title: 'Chapter 4 Quiz',
      course: 'Physics 102 - Fall Cohort',
      type: 'Quiz',
      status: 'Draft',
      startAt: new Date('2026-10-20T09:00:00'),
      submissions: 0,
      totalStudents: 120
    }
  ]);

  statusFilter = signal<string>('All');
  typeFilter = signal<string>('All');
}
