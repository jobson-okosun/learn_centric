import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface AttentionItem {
  id: string;
  category: string;
  title: string;
  description: string;
  target: string;
  time: string;
  actionLabel: string;
  route?: string;
}

export interface MetricCard {
  label: string;
  subtext: string;
  value: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface OrgUnitRow {
  id: string;
  name: string;
  code: string;
  type: string;
  headName: string;
  activeCourses: number;
  enrolledStudents: number;
  status: 'Active' | 'Under Review';
}

export interface RecentActivityItem {
  id: string;
  actorName: string;
  summary: string;
  timestamp: string;
}

@Component({
  imports: [RouterLink],
  selector: 'app-admin-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export default class AdminDashboard {
  readonly currentTerm = signal({
    sessionName: '2025/2026 Academic Year',
    termName: 'Second Semester',
    currentWeek: 8,
    totalWeeks: 16,
    progressPercent: 50,
    startDate: 'Jan 12, 2026',
    endDate: 'May 08, 2026',
  });

  readonly metricCards = signal<MetricCard[]>([
    {
      label: 'Total Learners',
      subtext: 'Across 128 class cohorts',
      value: '4,820',
      icon: 'users',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Instructors & Staff',
      subtext: 'Faculty, lecturers & TAs',
      value: '184',
      icon: 'academic',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Active Classes',
      subtext: 'Sections running this term',
      value: '96',
      icon: 'classes',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Courses',
      subtext: 'Approved catalog blueprints',
      value: '42',
      icon: 'book',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ]);

  readonly attentionItems = signal<AttentionItem[]>([
    {
      id: 'att-1',
      category: 'Course Review',
      title: 'Course publish approval requested',
      description: 'Dr. Evelyn Reed submitted "Quantum Mechanics III" for syllabus approval.',
      target: 'Course: PHYS-401',
      time: '25m ago',
      actionLabel: 'Review',
      route: '/app/teachings/courses',
    },
    {
      id: 'att-2',
      category: 'Class Staffing',
      title: 'Class cohort has no lead instructor',
      description: 'Differential Equations Section B starts in 5 days with 48 enrolled learners.',
      target: 'Class: MATH-204-B',
      time: '1h ago',
      actionLabel: 'Assign Instructor',
      route: '/admin/enrolments/classes',
    },
    {
      id: 'att-3',
      category: 'Enrolment',
      title: 'Class capacity reached',
      description: 'Foundations of Computer Systems has reached 196 of 200 enrolled students.',
      target: 'Class: CS-101-A',
      time: '3h ago',
      actionLabel: 'Manage Class',
      route: '/admin/enrolments/classes',
    },
    {
      id: 'att-4',
      category: 'Academic Appeal',
      title: 'Grade review requested',
      description: 'Student Marcus Chen submitted a formal appeal on Midterm Exam grading.',
      target: 'Student: STU-84912',
      time: '5h ago',
      actionLabel: 'View Appeal',
      route: '/admin/reports/broadsheet',
    },
  ]);

  readonly orgUnits = signal<OrgUnitRow[]>([
    {
      id: 'org-1',
      name: 'Faculty of Physical & Natural Sciences',
      code: 'SCI-01',
      type: 'Faculty',
      headName: 'Prof. Margaret Sterling',
      activeCourses: 18,
      enrolledStudents: 1420,
      status: 'Active',
    },
    {
      id: 'org-2',
      name: 'Faculty of Engineering & Computing',
      code: 'ENG-02',
      type: 'Faculty',
      headName: 'Dr. Arthur Vance',
      activeCourses: 22,
      enrolledStudents: 1850,
      status: 'Active',
    },
    {
      id: 'org-3',
      name: 'School of Humanities & Social Sciences',
      code: 'HUM-03',
      type: 'School',
      headName: 'Dr. Robert Thorne',
      activeCourses: 14,
      enrolledStudents: 890,
      status: 'Active',
    },
    {
      id: 'org-4',
      name: 'College of Health & Biomedical Sciences',
      code: 'MED-04',
      type: 'College',
      headName: 'Dr. Fatima Al-Hassan',
      activeCourses: 12,
      enrolledStudents: 660,
      status: 'Active',
    },
  ]);

  readonly recentActivity = signal<RecentActivityItem[]>([
    {
      id: 'act-1',
      actorName: 'Sarah Jenkins',
      summary: 'Assigned Course Coordinator role to Elena Rostova',
      timestamp: '12m ago',
    },
    {
      id: 'act-2',
      actorName: 'Academic Registry',
      summary: 'Updated Midterm examination window for Spring 2026',
      timestamp: '2h ago',
    },
    {
      id: 'act-3',
      actorName: 'Dr. Arthur Vance',
      summary: 'Approved syllabus for Advanced Algorithms (CS-301)',
      timestamp: '4h ago',
    },
    {
      id: 'act-4',
      actorName: 'SIS Sync Integration',
      summary: 'Synchronized 320 student registrations from institutional records',
      timestamp: '6h ago',
    },
  ]);

  dismissAttentionItem(id: string): void {
    this.attentionItems.update((items) => items.filter((item) => item.id !== id));
  }
}
