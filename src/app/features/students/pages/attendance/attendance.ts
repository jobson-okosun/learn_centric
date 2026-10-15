import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-attendance',
  templateUrl: './attendance.html',
})
export default class Attendance {
    metrics = signal({
        present: 22,
        absent: 1,
        late: 1,
        total: 24,
        rate: 92
    });

    log = signal([
        { date: 'Oct 20, 2026', class: 'Biology 201', type: 'Lecture', status: 'Present', note: '' },
        { date: 'Oct 18, 2026', class: 'Biology 201', type: 'Lab', status: 'Present', note: '' },
        { date: 'Oct 13, 2026', class: 'Biology 201', type: 'Lecture', status: 'Absent', note: 'Sick note provided' },
        { date: 'Oct 11, 2026', class: 'Biology 201', type: 'Lab', status: 'Late', note: '10 mins late' },
        { date: 'Oct 06, 2026', class: 'Biology 201', type: 'Lecture', status: 'Present', note: '' }
    ]);
}
