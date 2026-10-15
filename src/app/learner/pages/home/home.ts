import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink], 
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export default class Home {
  readonly studentName = signal('Alex Morgan');
  readonly currentTerm = signal('Spring 2026');

  readonly stats = signal([
    {
      label: 'Enrolled Courses',
      value: '4',
      subtext: '2 live cohorts • 2 self-paced',
      badgeBg: 'bg-violet-50',
      badgeColor: 'text-violet-600',
      type: 'courses',
    },
    {
      label: 'Due This Week',
      value: '3',
      subtext: '1 quiz due tonight',
      badgeBg: 'bg-amber-50',
      badgeColor: 'text-amber-600',
      type: 'deadlines',
    },
    {
      label: 'Completed Lessons',
      value: '28',
      subtext: '78% overall progress',
      badgeBg: 'bg-emerald-50',
      badgeColor: 'text-emerald-600',
      type: 'completed',
    },
    {
      label: 'Daily Practice Streak',
      value: '6 Days',
      subtext: 'Weekly badge in 1 day',
      badgeBg: 'bg-rose-50',
      badgeColor: 'text-rose-600',
      type: 'streak',
    },
  ]);

  readonly activeLesson = signal({
    courseTitle: 'Advanced Calculus & Linear Algebra',
    category: 'Mathematics',
    currentModule: 'Module 3: Integration by Parts & Power Series',
    instructor: 'Dr. Evelyn Reed',
    cohort: 'Spring 2026 • Section B',
    progress: 68,
    completedActivities: 14,
    totalActivities: 20,
    lastAccessed: '2 hours ago',
  });

  readonly enrolledCourses = signal([
    {
      id: 'math-204',
      title: 'Advanced Calculus & Linear Algebra',
      courseCode: 'MATH-204',
      cohort: 'Spring 2026 • Section B',
      instructor: 'Dr. Evelyn Reed',
      progress: 68,
      coverBadge: 'MATH\n204',
      coverTheme: 'bg-indigo-50 text-indigo-800 border-indigo-100',
      thumbnail: '/images/course-calculus.jpg',
      accentColor: 'bg-indigo-600',
      nextActivity: 'Lesson 3.2: Vector Fields',
    },
    {
      id: 'bio-101',
      title: 'General Biology: Cellular & Genetics',
      courseCode: 'BIO-101',
      cohort: 'Fall 2026 • Section A',
      instructor: 'Dr. Sarah Johnson',
      progress: 45,
      coverBadge: 'Cell Biology\n& Genetics',
      coverTheme: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      thumbnail: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&auto=format&fit=crop&q=80',
      accentColor: 'bg-emerald-600',
      nextActivity: 'Lab Report 2: Mitosis',
    },
    {
      id: 'cs-201',
      title: 'Foundations of Computer Systems',
      courseCode: 'CS-201',
      cohort: 'Spring 2026 • Cohort Alpha',
      instructor: 'Prof. Sarah Jenkins',
      progress: 82,
      coverBadge: 'Computer\nSystems\n& Logic',
      coverTheme: 'bg-blue-50 text-blue-800 border-blue-100',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
      accentColor: 'bg-blue-600',
      nextActivity: 'Quiz 4: Memory Caching',
    },
  ]);

  readonly todayLiveSessions = signal([
    {
      id: 's1',
      title: 'Calculus — Live Problem Solving',
      time: '10:30 - 11:45 AM',
      status: 'Starting in 25 mins',
      isImminent: true,
      instructor: 'Dr. Evelyn Reed',
      room: 'Live Room B',
      attendeeCount: 28,
    },
    {
      id: 's2',
      title: 'Biology 101 — Weekly Recitation',
      time: '02:00 - 03:00 PM',
      status: 'Scheduled',
      isImminent: false,
      instructor: 'Dr. Sarah Johnson',
      room: 'Main Lecture Hall',
      attendeeCount: 36,
    },
  ]);

  readonly upcomingDeadlines = signal([
    {
      id: 'd1',
      title: 'Calculus Quiz 3: Taylor Series',
      course: 'Advanced Calculus',
      dueLabel: 'Tonight, 11:59 PM',
      points: '25 pts',
      tag: 'Quiz',
      tagClass: 'bg-amber-50 text-amber-700 border-amber-200',
      urgency: 'high',
      actionLabel: 'Start Quiz',
      actionLink: '/learn/courses/math-204/assignments',
    },
    {
      id: 'd2',
      title: 'Lab Report: Microscope Observations',
      course: 'General Biology',
      dueLabel: 'Tomorrow, 05:00 PM',
      points: '50 pts',
      tag: 'Assignment',
      tagClass: 'bg-blue-50 text-blue-700 border-blue-200',
      urgency: 'medium',
      actionLabel: 'View Prompt',
      actionLink: '/learn/courses/bio-101/assignments',
    },
    {
      id: 'd3',
      title: 'Practice Drill: Logic Gates & Truth Tables',
      course: 'Computer Systems',
      dueLabel: 'Friday, Oct 16',
      points: 'Ungraded',
      tag: 'Practice Drill',
      tagClass: 'bg-purple-50 text-purple-700 border-purple-200',
      urgency: 'low',
      actionLabel: 'Start Drill',
      actionLink: '/learn/courses/cs-201/assignments',
    },
  ]);
}
