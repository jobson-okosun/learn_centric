import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-gradebook',
  styleUrl: './gradebook.css',
  templateUrl: './gradebook.html',
})
export default class Gradebook {
  readonly gradeSummary = signal({
    currentScore: '96.2%',
    letterGrade: 'A',
    completedAssignments: 8,
    totalAssignments: 10,
    classAverage: '84.5%',
  });

  readonly gradeCategories = signal([
    { name: 'Problem Sets & Homework', weight: '30%', score: '98%', status: 'On track' },
    { name: 'Quizzes', weight: '25%', score: '95%', status: 'On track' },
    { name: 'Midterm Exam', weight: '25%', score: '94%', status: 'Graded' },
    { name: 'Final Project / Capstone', weight: '20%', score: 'Pending', status: 'In progress' },
  ]);

  readonly gradeItems = signal([
    { title: 'Problem Set 1.1: Surface Projections', category: 'Homework', dueDate: 'Jan 20', score: '50 / 50', percentage: '100%', status: 'Graded', feedback: 'Exceptional visual sketch on 3D quadrics.' },
    { title: 'Quiz 1: Partial Differentiation Basics', category: 'Quiz', dueDate: 'Jan 28', score: '24 / 25', percentage: '96%', status: 'Graded', feedback: 'Minor error in product rule application on Q3.' },
    { title: 'Written Exercise 2: Extreme Values', category: 'Homework', dueDate: 'Feb 16', score: '48 / 50', percentage: '96%', status: 'Graded', feedback: 'Very well structured Lagrange proof.' },
    { title: 'Quiz 2: Tangent Planes & Gradients', category: 'Quiz', dueDate: 'Feb 20', score: '25 / 25', percentage: '100%', status: 'Graded', feedback: 'Perfect score!' },
    { title: 'Midterm Examination 1 (Modules 1-2)', category: 'Exam', dueDate: 'Mar 04', score: '94 / 100', percentage: '94%', status: 'Graded', feedback: 'Strong performance on vector fields section.' },
    { title: 'Quiz 3: Taylor Series & Power Approx', category: 'Quiz', dueDate: 'Tonight, 11:59 PM', score: '--', percentage: '--', status: 'Pending', feedback: 'Not submitted yet.' },
    { title: 'Problem Set 3: Vector Simulations', category: 'Project', dueDate: 'Oct 16', score: '--', percentage: '--', status: 'Upcoming', feedback: 'Due Oct 16.' },
  ]);
}
