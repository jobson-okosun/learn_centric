import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZardDropdownImports } from '@/shared/components/dropdown';

export interface StudentAttendanceRecord {
  id: string;
  courseCode: string;
  courseName: string;
  cohort: string;
  sessionTitle: string;
  dateStr: string;
  sessionTime: string;
  checkInTime: string;
  status: 'present' | 'late' | 'absent' | 'excused';
  verificationMethod: string;
}

@Component({
  imports: [RouterLink, FormsModule, ZardDropdownImports],
  selector: 'app-attendance',
  styleUrl: './attendance.css',
  templateUrl: './attendance.html',
})
export default class Attendance {
  readonly selectedDate = signal<string>(new Date().toISOString().split('T')[0]);
  readonly selectedCourse = signal('all');
  readonly selectedCohort = signal('all');
  readonly selectedStatus = signal('all');
  readonly searchQuery = signal('');

  readonly records = signal<StudentAttendanceRecord[]>([
    {
      id: 'att-1',
      courseCode: 'MATH-204-A',
      courseName: 'Multivariable Calculus',
      cohort: 'Cohort A',
      sessionTitle: 'Stokes’ Theorem & Surface Circulation',
      dateStr: 'Today, Oct 14',
      sessionTime: '2:00 PM – 3:30 PM',
      checkInTime: '2:01 PM',
      status: 'present',
      verificationMethod: 'Live Stage Auto Check-in',
    },
    {
      id: 'att-2',
      courseCode: 'BIO-101-B',
      courseName: 'Introduction to Biology',
      cohort: 'Cohort B',
      sessionTitle: 'Cell Structure & Membrane Transport Recitation',
      dateStr: 'Oct 13, 2026',
      sessionTime: '10:00 AM – 11:30 AM',
      checkInTime: '10:02 AM',
      status: 'present',
      verificationMethod: 'QR Portal Check-in',
    },
    {
      id: 'att-3',
      courseCode: 'MATH-204-A',
      courseName: 'Multivariable Calculus',
      cohort: 'Cohort A',
      sessionTitle: 'Green’s Theorem & Area Calculations in Flux',
      dateStr: 'Oct 12, 2026',
      sessionTime: '2:00 PM – 3:30 PM',
      checkInTime: '2:03 PM',
      status: 'present',
      verificationMethod: 'Live Stage Auto Check-in',
    },
    {
      id: 'att-4',
      courseCode: 'PHYS-301-A',
      courseName: 'Quantum Mechanics Foundations',
      cohort: 'Cohort A',
      sessionTitle: 'Wave-Particle Duality & Photoelectric Effect',
      dateStr: 'Oct 10, 2026',
      sessionTime: '3:00 PM – 4:30 PM',
      checkInTime: '3:18 PM',
      status: 'late',
      verificationMethod: 'Instructor Roll Call',
    },
    {
      id: 'att-5',
      courseCode: 'MATH-204-A',
      courseName: 'Multivariable Calculus',
      cohort: 'Cohort A',
      sessionTitle: 'Line Integrals with Respect to Arc Length',
      dateStr: 'Oct 09, 2026',
      sessionTime: '2:00 PM – 3:30 PM',
      checkInTime: '2:00 PM',
      status: 'present',
      verificationMethod: 'Live Stage Auto Check-in',
    },
    {
      id: 'att-6',
      courseCode: 'BIO-101-B',
      courseName: 'Introduction to Biology',
      cohort: 'Cohort B',
      sessionTitle: 'Microscopy Lab 1: Staining Bacterial Smears',
      dateStr: 'Oct 08, 2026',
      sessionTime: '1:00 PM – 3:00 PM',
      checkInTime: '1:05 PM',
      status: 'present',
      verificationMethod: 'Lab Station QR Scan',
    },
    {
      id: 'att-7',
      courseCode: 'PHYS-301-A',
      courseName: 'Quantum Mechanics Foundations',
      cohort: 'Cohort A',
      sessionTitle: 'Heisenberg Uncertainty Principle Seminar',
      dateStr: 'Oct 06, 2026',
      sessionTime: '3:00 PM – 4:30 PM',
      checkInTime: '—',
      status: 'excused',
      verificationMethod: 'Medical Exemption Approved',
    },
    {
      id: 'att-8',
      courseCode: 'MATH-204-A',
      courseName: 'Multivariable Calculus',
      cohort: 'Cohort A',
      sessionTitle: 'Lagrange Multipliers with Dual Constraints',
      dateStr: 'Sep 28, 2026',
      sessionTime: '2:00 PM – 3:30 PM',
      checkInTime: '—',
      status: 'absent',
      verificationMethod: 'No Check-In Recorded',
    },
  ]);

  readonly presentCount = computed(() => this.records().filter((r) => r.status === 'present').length);
  readonly lateCount = computed(() => this.records().filter((r) => r.status === 'late').length);
  readonly absentCount = computed(() => this.records().filter((r) => r.status === 'absent').length);
  readonly excusedCount = computed(() => this.records().filter((r) => r.status === 'excused').length);

  readonly overallRate = computed(() => {
    const total = this.records().length;
    if (total === 0) return 100;
    const attended = this.presentCount() + this.lateCount();
    return Math.round((attended / total) * 100);
  });

  readonly filteredRecords = computed(() => {
    const course = this.selectedCourse();
    const cohort = this.selectedCohort();
    const status = this.selectedStatus();
    const query = this.searchQuery().toLowerCase().trim();

    return this.records().filter((r) => {
      const matchCourse = course === 'all' || r.courseCode.toLowerCase().includes(course.toLowerCase());
      const matchCohort = cohort === 'all' || r.cohort === cohort;
      const matchStatus = status === 'all' || r.status === status;
      const matchQuery =
        !query ||
        r.sessionTitle.toLowerCase().includes(query) ||
        r.courseCode.toLowerCase().includes(query) ||
        r.dateStr.toLowerCase().includes(query);

      return matchCourse && matchCohort && matchStatus && matchQuery;
    });
  });

  clearFilters() {
    this.selectedCourse.set('all');
    this.selectedCohort.set('all');
    this.selectedStatus.set('all');
  }
}
