import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type InsightType = 'alert' | 'praise' | 'curriculum' | 'system';

export interface AIAction {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  courseCode: string;
  courseName: string;
  primaryActionLabel: string;
  primaryActionLink: string;
  secondaryActionLabel?: string;
  secondaryActionLink?: string;
  timestamp: string;
  isNew: boolean;
  metricBadge?: { label: string; value: string };
}

@Component({
  selector: 'app-insights-ai',
  imports: [RouterLink, FormsModule],
  templateUrl: './ai-insights.html',
  styleUrl: './ai-insights.css',
})
export default class AiInsights {
  readonly activeCategory = signal<'all' | 'alert' | 'practice' | 'praise'>('all');
  readonly selectedCourse = signal<string>('all');

  readonly courses = [
    { code: 'MATH-301', name: 'Advanced Calculus III' },
    { code: 'PHYS-201', name: 'Quantum Mechanics' },
    { code: 'CS-210', name: 'Data Structures & Algorithms' },
    { code: 'CHEM-110', name: 'General Chemistry' },
  ];

  readonly insights = signal<AIAction[]>([
    {
      id: 'ins-1',
      type: 'alert',
      title: 'Targeted Practice: Green’s Theorem & Surface Circulation',
      description: 'Your recent score was 70% in closed curve line integrals. AI analysis identified that parameterizing oriented boundary surfaces is your primary blocker. A 5-minute practice session will advance you to Meets Mastery.',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus III',
      primaryActionLabel: 'Start 5-Min Drill',
      primaryActionLink: '/learn/practice',
      secondaryActionLabel: 'Ask AI Tutor',
      secondaryActionLink: '/learn/tutor',
      timestamp: '10 mins ago',
      isNew: true,
      metricBadge: { label: 'Target Topic', value: 'VC.4.2 &middot; 70%' },
    },
    {
      id: 'ins-2',
      type: 'alert',
      title: 'Upcoming Test Preparation: Dynamic Programming Recurrences',
      description: 'You have a CS-210 test approaching in 4 days. While your tree balance invariants are exceptional (98%), practice drills indicate bottom-up memoization formulation needs reinforcement before exam day.',
      courseCode: 'CS-210',
      courseName: 'Data Structures & Algorithms',
      primaryActionLabel: 'Practice DP Recurrences',
      primaryActionLink: '/learn/practice',
      secondaryActionLabel: 'Review Past Quizzes',
      secondaryActionLink: '/learn/insights/assessments',
      timestamp: '2 hours ago',
      isNew: true,
      metricBadge: { label: 'Exam Prep', value: '4 Days Away' },
    },
    {
      id: 'ins-3',
      type: 'praise',
      title: 'Mastery Breakthrough: Exceeds Standards in Wave Mechanics',
      description: 'Outstanding work! Consecutive perfect scores on Problem Set 2 and Midterm Question 2 have boosted your Wave Equations competency to 4.0 (Exceeds Mastery). You are among the top 5% of your class.',
      courseCode: 'PHYS-201',
      courseName: 'Quantum Mechanics',
      primaryActionLabel: 'View Mastery Matrix',
      primaryActionLink: '/learn/insights/mastery',
      timestamp: 'Yesterday',
      isNew: true,
      metricBadge: { label: 'Mastery Tier', value: '4.0 Exceeds' },
    },
    {
      id: 'ins-4',
      type: 'curriculum',
      title: 'Spaced Repetition: Refresh Harmonic Oscillator Operators',
      description: 'It has been 12 days since you solved creation and annihilation operator exercises in PHYS-201. A quick 3-minute review today will reinforce long-term memory retention before the final unit exam.',
      courseCode: 'PHYS-201',
      courseName: 'Quantum Mechanics',
      primaryActionLabel: 'Start Quick Flashcards',
      primaryActionLink: '/learn/practice',
      secondaryActionLabel: 'Snooze 3 Days',
      timestamp: 'Yesterday',
      isNew: false,
      metricBadge: { label: 'Memory Decay Alert', value: '12 Days Inactive' },
    },
    {
      id: 'ins-5',
      type: 'system',
      title: 'Study Habit Insight: Peak Focus Window Detected',
      description: 'Your accuracy and problem-solving velocity are 28% higher when studying in the early evening between 5:00 PM and 7:00 PM. Reserving 30 minutes tonight to tackle your Chemical Equilibrium exercises will yield optimal retention.',
      courseCode: 'CHEM-110',
      courseName: 'General Chemistry',
      primaryActionLabel: 'Open Chemistry Practice',
      primaryActionLink: '/learn/practice',
      secondaryActionLabel: 'Dismiss',
      timestamp: '2 days ago',
      isNew: false,
      metricBadge: { label: 'Efficiency Boost', value: '+28% Velocity' },
    },
    {
      id: 'ins-6',
      type: 'praise',
      title: 'Progress Milestone: +18% Jump on Multiple Integrals',
      description: 'Great perseverance! Following your review of Jacobian polar transformations, your Problem Set 2 score surged to 94%, advancing you from Learning to Meets Mastery in Multiple Integrals.',
      courseCode: 'MATH-301',
      courseName: 'Advanced Calculus III',
      primaryActionLabel: 'View Quiz Breakdown',
      primaryActionLink: '/learn/insights/assessments',
      timestamp: '3 days ago',
      isNew: false,
      metricBadge: { label: 'Score Gain', value: '+18% Improvement' },
    },
  ]);

  readonly filteredInsights = computed(() => {
    const cat = this.activeCategory();
    const course = this.selectedCourse();

    return this.insights().filter(ins => {
      if (course !== 'all' && ins.courseCode !== course) {
        return false;
      }
      if (cat === 'alert') {
        return ins.type === 'alert';
      }
      if (cat === 'practice') {
        return ins.type === 'alert' || ins.type === 'curriculum';
      }
      if (cat === 'praise') {
        return ins.type === 'praise';
      }
      return true;
    });
  });

  readonly unreadCount = computed(() => {
    return this.insights().filter(i => i.isNew).length;
  });

  setCategory(cat: 'all' | 'alert' | 'practice' | 'praise'): void {
    this.activeCategory.set(cat);
  }

  markAllAsRead(): void {
    this.insights.update(list => list.map(item => ({ ...item, isNew: false })));
  }

  dismissInsight(id: string): void {
    this.insights.update(list => list.filter(item => item.id !== id));
  }
}
