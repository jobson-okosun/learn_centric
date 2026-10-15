import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-insights',
  templateUrl: './insights.html',
})
export default class Insights {
    riskAssessment = signal({
        level: 'Medium',
        factors: [
            'Missed Quiz 3 on Oct 15',
            'Submitted Essay late by 1 day',
            'Recent drop in engagement time'
        ]
    });

    recommendations = signal([
        'Send a check-in message to discuss the missed quiz and offer an extension.',
        'Provide additional visual resources for the Genetics module, as she performs better with visual learning.',
        'Schedule a brief 1-on-1 during office hours.'
    ]);

    patterns = signal([
        { title: 'Visual Learner', description: 'Consistently scores 15% higher on assessments with diagrams and models.' },
        { title: 'Night Owl', description: 'Most active in the platform between 9 PM and 11 PM.' },
        { title: 'Struggles with Essay Format', description: 'Written assignments score lower than multiple-choice and interactive quizzes.' }
    ]);
}
