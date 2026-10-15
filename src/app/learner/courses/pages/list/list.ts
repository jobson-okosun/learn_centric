import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports } from '@/shared/components/drawer';

export interface EnrolledCourseItem {
  id: string;
  courseCode: string;
  title: string;
  description: string;
  cohort: string;
  instructor: string;
  instructorAvatar?: string;
  progress: number;
  completedActivities: number;
  totalActivities: number;
  coverBadge: string;
  coverTheme: string;
  thumbnail?: string;
  accentColor: string;
  currentModule: string;
  nextActivity: string;
  nextDueDate?: string;
  status: 'in-progress' | 'completed';
  grade?: string;
  completedDate?: string;
}

@Component({
  imports: [RouterLink, FormsModule, ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports],
  selector: 'app-list',
  styleUrl: './list.css',
  templateUrl: './list.html',
})
export default class List {
  readonly activeFilter = signal<'all' | 'in-progress' | 'completed'>('all');
  readonly searchQuery = signal('');
  readonly joinDrawerVisible = signal(false);
  readonly joinCode = signal('');
  readonly joinError = signal<string | null>(null);
  readonly joinSuccess = signal(false);

  readonly courses = signal<EnrolledCourseItem[]>([
    {
      id: 'math-204',
      courseCode: 'MATH-204',
      title: 'Advanced Calculus & Linear Algebra',
      description: 'Vector spaces, multivariable differential calculus, matrix theory, and systems of linear equations.',
      cohort: 'Spring 2026 • Section B',
      instructor: 'Dr. Evelyn Reed',
      progress: 68,
      completedActivities: 14,
      totalActivities: 20,
      coverBadge: 'Advanced\nCalculus\n& Vectors',
      coverTheme: 'bg-indigo-50 text-indigo-800 border-indigo-100',
      thumbnail: '/images/course-calculus.jpg',
      accentColor: 'bg-indigo-600',
      currentModule: 'Module 3: Integration by Parts & Power Series',
      nextActivity: 'Quiz 3: Taylor Series',
      nextDueDate: 'Tonight, 11:59 PM',
      status: 'in-progress',
    },
    {
      id: 'bio-101',
      courseCode: 'BIO-101',
      title: 'General Biology: Cellular & Genetics',
      description: 'Cell structure, organelle functions, DNA replication, mitosis, and classical Mendelian genetics.',
      cohort: 'Fall 2026 • Section A',
      instructor: 'Dr. Sarah Johnson',
      progress: 45,
      completedActivities: 9,
      totalActivities: 20,
      coverBadge: 'Cell Biology\n& Genetics',
      coverTheme: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      thumbnail: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&auto=format&fit=crop&q=80',
      accentColor: 'bg-emerald-600',
      currentModule: 'Module 2: Cell Division & Chromosomes',
      nextActivity: 'Lab Report 2: Mitosis Observation',
      nextDueDate: 'Tomorrow, 5:00 PM',
      status: 'in-progress',
    },
    {
      id: 'cs-201',
      courseCode: 'CS-201',
      title: 'Foundations of Computer Systems',
      description: 'Digital logic, computer architecture, memory hierarchy, assembly language, and processor pipelining.',
      cohort: 'Spring 2026 • Cohort Alpha',
      instructor: 'Prof. Sarah Jenkins',
      progress: 82,
      completedActivities: 18,
      totalActivities: 22,
      coverBadge: 'Computer\nSystems\n& Logic',
      coverTheme: 'bg-blue-50 text-blue-800 border-blue-100',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
      accentColor: 'bg-blue-600',
      currentModule: 'Module 5: Virtual Memory & Caching',
      nextActivity: 'Quiz 4: Memory Hierarchy',
      nextDueDate: 'Oct 18, 11:59 PM',
      status: 'in-progress',
    },
    {
      id: 'phy-105',
      courseCode: 'PHY-105',
      title: 'Introduction to Modern Physics',
      description: 'Newtonian mechanics, harmonic wave motion, special relativity, and early quantum phenomena.',
      cohort: '2026 Academic Year',
      instructor: 'Dr. Alexander Hayes',
      progress: 30,
      completedActivities: 6,
      totalActivities: 20,
      coverBadge: 'Classical\nMechanics\n& Waves',
      coverTheme: 'bg-violet-50 text-violet-800 border-violet-100',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
      accentColor: 'bg-violet-600',
      currentModule: 'Module 2: Simple Harmonic Motion',
      nextActivity: 'Problem Set: Oscillators',
      nextDueDate: 'Oct 22, 5:00 PM',
      status: 'in-progress',
    },
    {
      id: 'chem-110',
      courseCode: 'CHEM-110',
      title: 'Principles of Organic Chemistry',
      description: 'Nomenclature, functional groups, reaction mechanisms, stereochemistry, and synthesis pathways.',
      cohort: 'Fall 2025 • Term Complete',
      instructor: 'Dr. Marcus Vance',
      progress: 100,
      completedActivities: 24,
      totalActivities: 24,
      coverBadge: 'Organic\nChemistry\nPrinciples',
      coverTheme: 'bg-amber-50 text-amber-800 border-amber-100',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
      accentColor: 'bg-amber-600',
      currentModule: 'Course Completed',
      nextActivity: 'Final Grade Released',
      status: 'completed',
      grade: 'A (94.2%)',
      completedDate: 'Dec 18, 2025',
    },
  ]);

  readonly filteredCourses = computed(() => {
    const filter = this.activeFilter();
    const query = this.searchQuery().trim().toLowerCase();

    return this.courses().filter(course => {
      const matchesFilter = filter === 'all' || course.status === filter;
      const matchesQuery = !query || 
        course.title.toLowerCase().includes(query) ||
        course.courseCode.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query);

      return matchesFilter && matchesQuery;
    });
  });

  readonly stats = computed(() => {
    const all = this.courses();
    const inProgress = all.filter(c => c.status === 'in-progress');
    const completed = all.filter(c => c.status === 'completed');
    const avgProgress = inProgress.length
      ? Math.round(inProgress.reduce((acc, c) => acc + c.progress, 0) / inProgress.length)
      : 100;

    return {
      total: all.length,
      inProgressCount: inProgress.length,
      completedCount: completed.length,
      avgProgress,
    };
  });

  setFilter(filter: 'all' | 'in-progress' | 'completed') {
    this.activeFilter.set(filter);
  }

  handleJoinSubmit() {
    const code = this.joinCode().trim().toUpperCase();
    if (!code) {
      this.joinError.set('Please enter an enrollment code');
      return;
    }
    if (code.length < 5) {
      this.joinError.set('Code must be at least 5 characters');
      return;
    }

    this.joinError.set(null);
    this.joinSuccess.set(true);

    setTimeout(() => {
      this.joinDrawerVisible.set(false);
      this.joinSuccess.set(false);
      this.joinCode.set('');
    }, 1500);
  }
}
