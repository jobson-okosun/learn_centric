import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-learning',
  templateUrl: './learning.html',
})
export default class Learning {
    timeSpent = signal({
        total: '32h 15m',
        thisWeek: '4h 30m',
        trend: '+12%',
        trendUp: true
    });

    learningPath = signal([
        { title: 'Module 1: Intro to Cell Biology', status: 'completed', progress: 100 },
        { title: 'Module 2: Cell Structure', status: 'completed', progress: 100 },
        { title: 'Module 3: Cell Division (Mitosis)', status: 'in-progress', progress: 65 },
        { title: 'Module 4: Genetics & Inheritance', status: 'not-started', progress: 0 },
        { title: 'Module 5: Cellular Respiration', status: 'not-started', progress: 0 }
    ]);

    recentActivity = signal([
        { action: 'Completed Quiz', target: 'Cell Structure Basics', time: '2 hours ago', icon: 'check-circle', color: 'text-green-500', bg: 'bg-green-50' },
        { action: 'Watched Video', target: 'Mitosis vs Meiosis', time: 'Yesterday', icon: 'play-circle', color: 'text-blue-500', bg: 'bg-blue-50' },
        { action: 'Read Article', target: 'Mendelian Genetics', time: '3 days ago', icon: 'file-text', color: 'text-purple-500', bg: 'bg-purple-50' },
        { action: 'Submitted Assignment', target: 'Cell Diagram', time: '1 week ago', icon: 'upload-cloud', color: 'text-primary', bg: 'bg-primary/10' }
    ]);
}
