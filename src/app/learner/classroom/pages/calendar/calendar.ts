import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { ZardDialogService } from '@/shared/components/dialog';
import { LiveStageModal } from '../../components/live-stage/live-stage';

export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export interface CalendarEvent {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  cohort: string;
  type: 'live' | 'deadline' | 'lab' | 'office';
  dateStr: string;
  timeStr: string;
  dayNumber: number;
  monthIndex: number; // 9 for October
  year: number;
  description: string;
  instructor?: string;
  isToday?: boolean;
  isLiveNow?: boolean;
}

@Component({
  imports: [RouterLink, FormsModule, ZardDropdownImports],
  selector: 'app-calendar',
  styleUrl: './calendar.css',
  templateUrl: './calendar.html',
})
export default class Calendar {
  private readonly router = inject(Router);
  private readonly dialogService = inject(ZardDialogService);

  readonly view = signal<CalendarView>('agenda');
  readonly selectedCourse = signal('all');
  readonly selectedCohort = signal('all');
  readonly selectedType = signal('all');
  readonly selectedActiveEvent = signal<CalendarEvent | null>(null);

  readonly weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  readonly monthDays = Array.from({ length: 35 }, (_, i) => {
    const date = new Date(2026, 9, i - 3);
    return {
      date: date.getDate(),
      isCurrentMonth: date.getMonth() === 9,
      isToday: date.getDate() === 14 && date.getMonth() === 9,
    };
  });

  readonly allEvents = signal<CalendarEvent[]>([
    {
      id: 'cal-1',
      title: 'Stokes’ Theorem & Surface Circulation',
      courseCode: 'MATH-204-A',
      courseName: 'Multivariable Calculus',
      cohort: 'Cohort A',
      type: 'live',
      dateStr: 'Today, Oct 14',
      timeStr: '2:00 PM – 3:30 PM',
      dayNumber: 14,
      monthIndex: 9,
      year: 2026,
      instructor: 'Dr. Sarah Johnson',
      isToday: true,
      isLiveNow: true,
      description: 'Parametric surface integrals, flux calculations, and Stokes’ curl boundary applications.',
    },
    {
      id: 'cal-2',
      title: 'Cellular Mitosis & Microscopic Staining Q&A',
      courseCode: 'BIO-101-B',
      courseName: 'Introduction to Biology',
      cohort: 'Cohort B',
      type: 'live',
      dateStr: 'Tomorrow, Oct 15',
      timeStr: '10:00 AM – 11:30 AM',
      dayNumber: 15,
      monthIndex: 9,
      year: 2026,
      instructor: 'Prof. Michael Chang',
      description: 'Review of cell wall mechanics, mitosis phases, and live slide staining procedures.',
    },
    {
      id: 'cal-3',
      title: 'Lab Report: Mitosis & Staining',
      courseCode: 'BIO-101-B',
      courseName: 'Introduction to Biology',
      cohort: 'Cohort B',
      type: 'deadline',
      dateStr: 'Thursday, Oct 16',
      timeStr: '11:59 PM',
      dayNumber: 16,
      monthIndex: 9,
      year: 2026,
      instructor: 'Prof. Michael Chang',
      description: 'Submit your 2-page lab report based on Tuesday’s microscope observations.',
    },
    {
      id: 'cal-4',
      title: 'Quantum Wavefunctions & Probability Density',
      courseCode: 'PHYS-301-A',
      courseName: 'Quantum Mechanics Foundations',
      cohort: 'Cohort A',
      type: 'live',
      dateStr: 'Friday, Oct 17',
      timeStr: '3:00 PM – 4:30 PM',
      dayNumber: 17,
      monthIndex: 9,
      year: 2026,
      instructor: 'Dr. Elena Rostova',
      description: 'Deriving the 1D Schrödinger equation and infinite square well wave solutions.',
    },
    {
      id: 'cal-5',
      title: 'Numerical Vector Flux Simulation Lab',
      courseCode: 'MATH-204-A',
      courseName: 'Multivariable Calculus',
      cohort: 'Cohort A',
      type: 'lab',
      dateStr: 'Monday, Oct 20',
      timeStr: '1:00 PM – 3:00 PM',
      dayNumber: 20,
      monthIndex: 9,
      year: 2026,
      instructor: 'TA Marcus Vance',
      description: 'Hands-on MATLAB / Python simulation of 3D vector fields and divergence plots.',
    },
    {
      id: 'cal-6',
      title: 'Instructor Virtual Office Hours',
      courseCode: 'BIO-101-B',
      courseName: 'Introduction to Biology',
      cohort: 'Cohort B',
      type: 'office',
      dateStr: 'Wednesday, Oct 22',
      timeStr: '4:00 PM – 5:30 PM',
      dayNumber: 22,
      monthIndex: 9,
      year: 2026,
      instructor: 'Prof. Michael Chang',
      description: 'Drop-in 1-on-1 assistance for lab report questions and exam prep.',
    },
  ]);

  readonly filteredEvents = computed(() => {
    const course = this.selectedCourse();
    const cohort = this.selectedCohort();
    const type = this.selectedType();

    return this.allEvents().filter((e) => {
      const matchCourse = course === 'all' || e.courseCode.toLowerCase().includes(course.toLowerCase());
      const matchCohort = cohort === 'all' || e.cohort === cohort;
      const matchType = type === 'all' || e.type === type;
      return matchCourse && matchCohort && matchType;
    });
  });

  setView(v: CalendarView) {
    this.view.set(v);
  }

  clearFilters() {
    this.selectedCourse.set('all');
    this.selectedCohort.set('all');
    this.selectedType.set('all');
  }

  getEventForCell(d: { date: number; isCurrentMonth: boolean }): CalendarEvent | null {
    if (!d.isCurrentMonth) return null;
    return this.filteredEvents().find((e) => e.dayNumber === d.date && e.monthIndex === 9) || null;
  }

  getStartTime(timeStr: string): string {
    return timeStr.split('–')[0].split('-')[0].trim();
  }

  joinLive(event: CalendarEvent | null) {
    this.dialogService.create({
      zContent: LiveStageModal,
      zHideHeader: true,
      zHideFooter: true,
      zMaskClosable: false,
      zData: event
        ? {
            title: event.title,
            courseCode: event.courseCode,
            courseTitle: event.courseName,
            classCohort: event.cohort,
            instructor: event.instructor || 'Dr. Marcus Vance',
          }
        : undefined,
      zCustomClasses: 'h-[98vh] min-w-[calc(100vw-1rem)] !p-0 overflow-hidden rounded-2xl flex flex-col bg-white',
    });
  }
}
