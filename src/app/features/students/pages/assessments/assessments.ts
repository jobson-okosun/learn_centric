import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-assessments',
  templateUrl: './assessments.html',
})
export default class Assessments {
    assessments = signal([
        { name: 'Quiz 3: Genetics & Punnett Squares', type: 'Quiz', date: 'Oct 15, 2026', score: 54, total: 100, attempts: 2, status: 'Needs Review' },
        { name: 'Midterm Exam: Cell Biology', type: 'Exam', date: 'Oct 01, 2026', score: 78, total: 100, attempts: 1, status: 'Graded' },
        { name: 'Quiz 2: Cell Division', type: 'Quiz', date: 'Sep 22, 2026', score: 85, total: 100, attempts: 1, status: 'Graded' },
        { name: 'Quiz 1: Cell Structure', type: 'Quiz', date: 'Sep 10, 2026', score: 92, total: 100, attempts: 1, status: 'Graded' }
    ]);
}
