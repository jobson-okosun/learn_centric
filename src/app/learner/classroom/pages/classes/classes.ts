import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZardDrawerImports } from '@/shared/components/drawer';
import { ZardDialogService } from '@/shared/components/dialog';
import { LiveStageModal } from '../../components/live-stage/live-stage';

export interface EnrolledClass {
  id: string;
  code: string;
  title: string;
  courseName: string;
  cohort: string;
  status: 'current' | 'upcoming' | 'completed';
  instructor: {
    name: string;
    avatar: string;
    role: string;
  };
  classmatesCount: number;
  attendanceRate: number;
  personalProgress: number;
  nextSession?: {
    title: string;
    time: string;
    isLiveNow?: boolean;
    room: string;
  };
  colorTheme: string;
  iconBg: string;
  iconColor: string;
}

@Component({
  imports: [RouterLink, FormsModule, ZardDrawerImports],
  selector: 'app-classes',
  styleUrl: './classes.css',
  templateUrl: './classes.html',
})
export default class Classes {
  private readonly dialogService = inject(ZardDialogService);

  readonly currentFilter = signal<'current' | 'upcoming' | 'completed'>('current');
  readonly searchQuery = signal('');
  readonly joinClassVisible = signal(false);
  readonly joinCodeInput = signal('');
  readonly joinSuccessMessage = signal('');

  readonly classes = signal<EnrolledClass[]>([
    {
      id: 'math-204-a',
      code: 'MATH-204-A',
      title: 'Multivariable Calculus · Cohort A',
      courseName: 'Advanced Multivariable Calculus & Vector Fields',
      cohort: 'Fall 2026',
      status: 'current',
      instructor: {
        name: 'Dr. Sarah Johnson',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
        role: 'Lead Instructor',
      },
      classmatesCount: 34,
      attendanceRate: 96,
      personalProgress: 68,
      nextSession: {
        title: 'Stokes’ Theorem & Surface Flux',
        time: 'Today, 2:00 PM',
        isLiveNow: true,
        room: 'Virtual Room A-102',
      },
      colorTheme: 'text-primary',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      id: 'bio-101-b',
      code: 'BIO-101-B',
      title: 'Cellular Biology · Section B',
      courseName: 'Molecular Cell Biology & Genetics',
      cohort: 'Fall 2026',
      status: 'current',
      instructor: {
        name: 'Prof. David Miller',
        avatar: 'https://ui-avatars.com/api/?name=David+Miller&background=10B981&color=fff',
        role: 'Associate Professor',
      },
      classmatesCount: 42,
      attendanceRate: 92,
      personalProgress: 45,
      nextSession: {
        title: 'Cellular Division & Mitosis Review',
        time: 'Tomorrow, 10:00 AM',
        isLiveNow: false,
        room: 'Bio Lab Live Stage',
      },
      colorTheme: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'cs-106-a',
      code: 'CS-106-A',
      title: 'Data Structures & Algorithms · Lab 1',
      courseName: 'Computer Science: Algorithms and Memory Trees',
      cohort: 'Fall 2026',
      status: 'current',
      instructor: {
        name: 'Dr. Alan Vance',
        avatar: 'https://ui-avatars.com/api/?name=Alan+Vance&background=6366F1&color=fff',
        role: 'Department Chair',
      },
      classmatesCount: 28,
      attendanceRate: 100,
      personalProgress: 82,
      nextSession: {
        title: 'Balanced Binary Search Trees & AVL Rotations',
        time: 'Thursday, 1:00 PM',
        isLiveNow: false,
        room: 'CS Studio 3',
      },
      colorTheme: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      id: 'phys-201-a',
      code: 'PHYS-201',
      title: 'Classical Mechanics & Wave Dynamics',
      courseName: 'Physics II: Oscillations, Gravity & Rotational Motion',
      cohort: 'Spring 2027',
      status: 'upcoming',
      instructor: {
        name: 'Dr. Elena Rostova',
        avatar: 'https://ui-avatars.com/api/?name=Elena+Rostova&background=8B5CF6&color=fff',
        role: 'Senior Lecturer',
      },
      classmatesCount: 30,
      attendanceRate: 0,
      personalProgress: 0,
      colorTheme: 'text-purple-600',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      id: 'math-102-c',
      code: 'MATH-102',
      title: 'Single Variable Calculus · Section C',
      courseName: 'Foundations of Differential & Integral Calculus',
      cohort: 'Summer 2026',
      status: 'completed',
      instructor: {
        name: 'Dr. Sarah Johnson',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
        role: 'Lead Instructor',
      },
      classmatesCount: 36,
      attendanceRate: 98,
      personalProgress: 100,
      colorTheme: 'text-gray-600',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
    },
  ]);

  readonly filteredClasses = computed(() => {
    const filter = this.currentFilter();
    const query = this.searchQuery().trim().toLowerCase();

    return this.classes().filter((c) => {
      const matchesFilter = c.status === filter;
      const matchesQuery =
        !query ||
        c.title.toLowerCase().includes(query) ||
        c.code.toLowerCase().includes(query) ||
        c.courseName.toLowerCase().includes(query) ||
        c.instructor.name.toLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });
  });

  setFilter(filter: 'current' | 'upcoming' | 'completed') {
    this.currentFilter.set(filter);
  }

  submitJoinClass() {
    const code = this.joinCodeInput().trim().toUpperCase();
    if (!code) return;

    this.joinSuccessMessage.set(`Successfully enrolled into class with code ${code}!`);
    setTimeout(() => {
      this.joinSuccessMessage.set('');
      this.joinCodeInput.set('');
      this.joinClassVisible.set(false);
    }, 1500);
  }

  openLiveStage(item: EnrolledClass) {
    this.dialogService.create({
      zContent: LiveStageModal,
      zData: {
        sessionTitle: item.nextSession?.title || item.title,
        courseTitle: item.courseName,
        cohortName: item.cohort,
        instructorName: item.instructor.name,
        instructorAvatar: item.instructor.avatar,
      },
      zHideHeader: true,
      zHideFooter: true,
      zMaskClosable: false,
      zCustomClasses: 'h-[98vh] min-w-[calc(100vw-1rem)] !p-0 overflow-hidden rounded-2xl flex flex-col bg-white',
    });
  }
}
