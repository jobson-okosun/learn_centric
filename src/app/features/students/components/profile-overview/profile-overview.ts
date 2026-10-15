import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile-overview',
    imports: [CommonModule],
    templateUrl: './profile-overview.html'
})
export default class ProfileOverview {
    metrics = signal({
        completion: 71,
        mastery: 68,
        assignments: { completed: 14, total: 18 },
        attendance: 92,
        risk: 'Medium'
    });

    masteryTopics = signal([
        { name: 'Cell Structure', score: 91, warning: false },
        { name: 'Cell Division', score: 76, warning: false },
        { name: 'Genetics', score: 54, warning: true },
        { name: 'Metabolism', score: 68, warning: false }
    ]);
}
