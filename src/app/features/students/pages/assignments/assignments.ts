import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-assignments',
  templateUrl: './assignments.html',
})
export default class Assignments {
    assignments = signal([
        { title: 'Lab Report: Mitosis', due: 'Oct 25, 2026', submitted: null, score: null, total: 100, status: 'To Do', feedback: '' },
        { title: 'Essay: Mendelian Genetics', due: 'Oct 15, 2026', submitted: 'Oct 16, 2026', score: null, total: 50, status: 'Submitted Late', feedback: '' },
        { title: 'Worksheet: Cell Structure', due: 'Sep 20, 2026', submitted: 'Sep 19, 2026', score: 45, total: 50, status: 'Graded', feedback: 'Great diagrams, but missing some labels on the mitochondria.' },
        { title: 'Project: DNA Model', due: 'Sep 05, 2026', submitted: 'Sep 05, 2026', score: 95, total: 100, status: 'Graded', feedback: 'Excellent effort and creativity.' }
    ]);
}
