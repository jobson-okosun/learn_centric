import { Component, signal } from '@angular/core';

export interface NotificationSetting {
  id: string;
  category: 'live' | 'assignments' | 'discussions' | 'announcements' | 'habits';
  title: string;
  description: string;
  inApp: boolean;
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
}

@Component({
  imports: [],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export default class Notifications {
  readonly emailDigestMode = signal<'instant' | 'daily' | 'weekly'>('daily');
  readonly saveSuccess = signal(false);

  readonly settingsList = signal<NotificationSetting[]>([
    {
      id: 'notif-1',
      category: 'live',
      title: 'Live Virtual Lecture Starting',
      description: 'Alert sent 15 minutes prior to scheduled start and when the instructor begins streaming',
      inApp: true,
      email: true,
      sms: false,
      whatsapp: true,
    },
    {
      id: 'notif-2',
      category: 'live',
      title: 'Lecture Recording Ready',
      description: 'Notification when virtual classroom video recording is processed and available',
      inApp: true,
      email: true,
      sms: false,
      whatsapp: false,
    },
    {
      id: 'notif-3',
      category: 'assignments',
      title: 'Assignment & Drill Deadlines',
      description: 'Reminder 24 hours and 2 hours before due dates',
      inApp: true,
      email: true,
      sms: true,
      whatsapp: true,
    },
    {
      id: 'notif-4',
      category: 'assignments',
      title: 'Grades & Rubric Feedback',
      description: 'Instant notification when exam scores and instructor remarks are published',
      inApp: true,
      email: true,
      sms: false,
      whatsapp: false,
    },
    {
      id: 'notif-5',
      category: 'discussions',
      title: 'Instructor Reply in Discussions',
      description: 'When an instructor or TA answers your question thread',
      inApp: true,
      email: true,
      sms: false,
      whatsapp: false,
    },
    {
      id: 'notif-6',
      category: 'discussions',
      title: 'Direct Messages from Faculty',
      description: 'Private message notifications from professors or academic advisors',
      inApp: true,
      email: true,
      sms: true,
      whatsapp: true,
    },
    {
      id: 'notif-7',
      category: 'announcements',
      title: 'Urgent Cohort Broadcasts',
      description: 'Critical schedule cancellations, exam hall reassignments, or emergency updates',
      inApp: true,
      email: true,
      sms: true,
      whatsapp: true,
    },
    {
      id: 'notif-8',
      category: 'habits',
      title: 'Practice Streak Nudges',
      description: 'Daily reminder at 7:00 PM if active practice streak has not been completed',
      inApp: true,
      email: false,
      sms: false,
      whatsapp: false,
    },
  ]);

  toggleChannel(id: string, channel: 'inApp' | 'email' | 'sms' | 'whatsapp'): void {
    this.settingsList.update(items =>
      items.map(item => (item.id === id ? { ...item, [channel]: !item[channel] } : item))
    );
  }

  savePreferences(): void {
    this.saveSuccess.set(true);
    setTimeout(() => this.saveSuccess.set(false), 3500);
  }
}
