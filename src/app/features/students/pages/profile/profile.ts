import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-profile',
    imports: [CommonModule, RouterModule],
    templateUrl: './profile.html'
})
export default class Profile {
    tabs = [
        { label: 'Overview', route: 'overview' },
        { label: 'Learning', route: 'learning' },
        { label: 'Assessments', route: 'assessments' },
        { label: 'Attendance', route: 'attendance' },
        { label: 'Assignments', route: 'assignments' },
        { label: 'Communication', route: 'communication' },
        { label: 'AI Insights', route: 'insights' }
    ];

    // Mock student profile
    student = signal({
        name: 'Sarah Johnson',
        initial: 'S',
        course: 'BIO 201',
        class: 'Class A'
    });
}
