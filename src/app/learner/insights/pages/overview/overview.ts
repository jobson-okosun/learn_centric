import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface CoursePerformanceItem {
  id: string;
  code: string;
  title: string;
  modulesCount: number;
  instructor: string;
  attendanceRate: number;
  courseworkAvg: number;
  assessmentScore: number;
  overallScore: number;
  standing: 'Distinction' | 'On Track' | 'Progressing' | 'Needs Attention';
}

export type CourseBroadsheetItem = CoursePerformanceItem;

@Component({
  selector: 'app-insights-overview',
  imports: [RouterLink, FormsModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export default class Overview {
  readonly selectedPeriod = signal<string>('Current Cohort 2026');

  // Universal Performance Metrics (Organizations, Academies & Corporate LMS Friendly)
  readonly overallScore = signal<number>(89);
  readonly cohortAverage = signal<number>(76);
  readonly completedModules = signal<number>(14);
  readonly totalModules = signal<number>(18);
  readonly progressRate = computed(() =>
    Math.round((this.completedModules() / this.totalModules()) * 100)
  );

  readonly assessmentPassRate = signal<number>(94);
  readonly totalAssessmentsTaken = signal<number>(16);
  readonly totalLearningHours = signal<number>(142);
  readonly performanceStanding = signal<string>('Top Performer &middot; Good Standing');

  // Enrolled Courses Performance Ledger
  readonly courses = signal<CoursePerformanceItem[]>([
    {
      id: 'math-301',
      code: 'MATH-301',
      title: 'Multivariable Calculus & Geometry',
      modulesCount: 8,
      instructor: 'Dr. Sarah Johnson',
      attendanceRate: 96,
      courseworkAvg: 92,
      assessmentScore: 94,
      overallScore: 93,
      standing: 'Distinction',
    },
    {
      id: 'phys-201',
      code: 'PHYS-201',
      title: 'Modern Quantum Mechanics',
      modulesCount: 6,
      instructor: 'Prof. Jonathan Hayes',
      attendanceRate: 92,
      courseworkAvg: 88,
      assessmentScore: 89,
      overallScore: 89,
      standing: 'Distinction',
    },
    {
      id: 'cs-210',
      code: 'CS-210',
      title: 'Data Structures & Algorithms',
      modulesCount: 10,
      instructor: 'Dr. Michael Chen',
      attendanceRate: 94,
      courseworkAvg: 90,
      assessmentScore: 91,
      overallScore: 91,
      standing: 'Distinction',
    },
    {
      id: 'bio-105',
      code: 'BIO-105',
      title: 'Introduction to Molecular Biology',
      modulesCount: 6,
      instructor: 'Dr. Elena Rostova',
      attendanceRate: 88,
      courseworkAvg: 82,
      assessmentScore: 84,
      overallScore: 83,
      standing: 'On Track',
    },
    {
      id: 'chem-110',
      code: 'CHEM-110',
      title: 'Principles of General Chemistry',
      modulesCount: 6,
      instructor: 'Prof. Marcus Vance',
      attendanceRate: 90,
      courseworkAvg: 85,
      assessmentScore: 86,
      overallScore: 86,
      standing: 'On Track',
    },
  ]);

  readonly totalCourseModules = computed(() =>
    this.courses().reduce((sum, c) => sum + c.modulesCount, 0)
  );

  readonly avgAttendance = computed(() => {
    const list = this.courses();
    return Math.round(
      list.reduce((sum, c) => sum + c.attendanceRate, 0) / (list.length || 1)
    );
  });
}
