import { Component, computed, signal } from '@angular/core';

export interface AssignmentItem {
  id: string;
  type: 'assignment' | 'quiz';
  title: string;
  module: string;
  points: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  score?: string;
  feedback?: string;
}

@Component({
  imports: [],
  selector: 'app-assignments',
  styleUrl: './assignments.css',
  templateUrl: './assignments.html',
})
export default class Assignments {
  readonly assignmentFilter = signal<'all' | 'pending' | 'completed'>('all');

  readonly filterTabs = signal<{ id: 'all' | 'pending' | 'completed'; label: string }[]>([
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
  ]);

  readonly assignments = signal<AssignmentItem[]>([
    {
      id: 'a1',
      type: 'assignment',
      title: 'Problem Set 1.1: Surface Projections & Coordinate Mapping',
      module: 'Module 1: Foundations of Multivariable Functions',
      points: '50 pts',
      dueDate: 'Jan 20, 2026',
      status: 'completed',
      score: '50 / 50 (100%)',
      feedback: 'Excellent work with cylindrical conversions and clear 3D sketches.',
    },
    {
      id: 'q1',
      type: 'quiz',
      title: 'Quiz 1: Partial Differentiation Basics',
      module: 'Module 1: Foundations of Multivariable Functions',
      points: '25 pts',
      dueDate: 'Jan 28, 2026',
      status: 'completed',
      score: '24 / 25 (96%)',
      feedback: 'Minor sign error in second-order mixed partials on question 4.',
    },
    {
      id: 'a2',
      type: 'assignment',
      title: 'Written Exercise 2: Extreme Values & Saddle Points',
      module: 'Module 2: Directional Derivatives & Gradient Vector',
      points: '50 pts',
      dueDate: 'Feb 16, 2026',
      status: 'completed',
      score: '48 / 50 (96%)',
      feedback: 'Solid analysis of Hessian determinant test.',
    },
    {
      id: 'q3',
      type: 'quiz',
      title: 'Quiz 3: Taylor Series & Power Approximations',
      module: 'Module 3: Multiple Integrals & Vector Fields',
      points: '25 pts',
      dueDate: 'Tonight, 11:59 PM',
      status: 'pending',
    },
    {
      id: 'a3',
      type: 'assignment',
      title: 'Problem Set 3: Vector Calculus Simulations',
      module: 'Module 3: Multiple Integrals & Vector Fields',
      points: '100 pts',
      dueDate: 'Oct 16, 5:00 PM',
      status: 'pending',
    },
    {
      id: 'standalone-midterm',
      type: 'quiz',
      title: 'Midterm Examination (Comprehensive Modules 1-2)',
      module: 'Course Milestones',
      points: '100 pts',
      dueDate: 'Mar 04, 2026',
      status: 'completed',
      score: '94 / 100 (94%)',
      feedback: 'Strong performance across vector calculus sections.',
    },
    {
      id: 'standalone-capstone',
      type: 'assignment',
      title: 'Final Capstone Project: Fluid Flow Simulation',
      module: 'Course Milestones',
      points: '150 pts',
      dueDate: 'Dec 10, 11:59 PM',
      status: 'pending',
    }
  ]);

  readonly filteredAssignments = computed(() => {
    const filter = this.assignmentFilter();
    const list = this.assignments();
    if (filter === 'pending') {
      return list.filter(a => a.status === 'pending' || a.status === 'in-progress');
    }
    if (filter === 'completed') {
      return list.filter(a => a.status === 'completed');
    }
    return list;
  });

  setFilter(filter: 'all' | 'pending' | 'completed') {
    this.assignmentFilter.set(filter);
  }
}
