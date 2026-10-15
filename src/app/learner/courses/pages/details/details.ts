import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html',
})
export default class Details {
  readonly course = signal({
    id: 'math-204',
    code: 'MATH-204',
    title: 'Advanced Calculus & Linear Algebra',
    cohort: 'Spring 2026 • Section B',
    instructor: 'Dr. Evelyn Reed',
    term: 'Spring 2026',
    progress: 68,
    completedItems: 14,
    totalItems: 20,
    coverBadge: 'MATH\n204',
    coverTheme: 'bg-indigo-50 text-indigo-800 border-indigo-100',
    thumbnail: '/images/course-calculus.jpg',
    description: 'A rigorous introduction to multivariable differential and integral calculus, vector spaces, and linear transformations.',
  });
}
