import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export default class Notifications {
  readonly emailNotifications = signal(true);
  readonly pushNotifications = signal(true);
  readonly smsAlerts = signal(false);

  readonly submissionAlertFrequency = signal<'instant' | 'daily-digest' | 'off'>('daily-digest');
  readonly dailyDigestTime = signal('17:00');
  readonly notifyLateSubmissions = signal(true);
  readonly notifyForumMentions = signal(true);
  readonly notifyDirectMessages = signal(true);
  readonly notifyOfficeHoursQueue = signal(true);
  readonly notifyAttendanceDeficit = signal(true);
  readonly notifyGradeDrop = signal(true);
  readonly notifyStageStarting = signal(true);

  // Safely handling the values dynamically via Angular signals

  readonly saveSuccess = signal(false);

  saveNotifications(): void {
    // Pro-tip: Send this.slackWebhookUrl() to your secured backend API here!
    this.saveSuccess.set(true);
    setTimeout(() => {
      this.saveSuccess.set(false);
    }, 3500);
  }
}
