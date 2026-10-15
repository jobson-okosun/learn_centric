import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type InsightType = 'alert' | 'praise' | 'curriculum' | 'system';

interface AIAction {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  timestamp: string;
  isNew: boolean;
  students?: string[];
}

@Component({
  imports: [CommonModule],
  selector: 'app-ai-insights',
  templateUrl: './ai-insights.html',
})
export default class AIInsights {
  
  insights = signal<AIAction[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Intervention Required',
      description: '3 students (Sophia, Michael, and David) have failed the last two assignments in Unit 2: Genetics. They are at high risk of falling behind.',
      primaryActionLabel: 'Message Students',
      secondaryActionLabel: 'Assign Review Module',
      timestamp: 'Just now',
      isNew: true,
      students: ['SP', 'MC', 'DW']
    },
    {
      id: '2',
      type: 'praise',
      title: 'Praise Opportunity',
      description: '5 students improved their score by over 20% on the Midterm Exam compared to their Quiz 2 average.',
      primaryActionLabel: 'Send Praise',
      timestamp: '2 hours ago',
      isNew: true,
      students: ['ET', 'JW', 'OD', 'WM', 'SJ']
    },
    {
      id: '3',
      type: 'curriculum',
      title: 'Curriculum Feedback',
      description: 'Question 4 on the Midterm Exam had a 15% success rate and an average completion time of 4 minutes. Consider reviewing the question clarity or covering the topic again in class.',
      primaryActionLabel: 'View Question',
      secondaryActionLabel: 'Dismiss',
      timestamp: 'Yesterday',
      isNew: false
    },
    {
      id: '4',
      type: 'system',
      title: 'Grading Anomaly Detected',
      description: 'The average score for Lab Report 3 was unusually high (94%) compared to historical averages for this assignment (78%).',
      primaryActionLabel: 'Review Grades',
      timestamp: 'Yesterday',
      isNew: false
    }
  ]);

  dismissInsight(id: string) {
    this.insights.update(list => list.filter(i => i.id !== id));
  }

  getButtonClass(type: InsightType): string {
    return 'bg-violet-50 text-primary hover:bg-violet-100';
  }
}
