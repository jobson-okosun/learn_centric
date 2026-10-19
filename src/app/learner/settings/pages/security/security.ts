import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ActiveSessionDevice {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

@Component({
  imports: [FormsModule],
  templateUrl: './security.html',
  styleUrl: './security.css', 
})
export default class Security {
  readonly currentPassword = signal('');
  readonly newPassword = signal('');
  readonly confirmPassword = signal('');
  readonly twoFactorEnabled = signal(true);
  readonly showOnLeaderboards = signal(true);
  readonly showStreakPublicly = signal(true);
  readonly showEnrolledCourses = signal(false);

  readonly passwordUpdated = signal(false);
  readonly passwordError = signal('');

  readonly activeSessions = signal<ActiveSessionDevice[]>([
    {
      id: 'sess-1',
      device: 'Windows PC (Desktop)',
      browser: 'Google Chrome 124.0',
      location: 'New York, NY, United States',
      ip: '192.0.2.45',
      lastActive: 'Active now',
      isCurrent: true,
    },
    {
      id: 'sess-2',
      device: 'iPhone 15 Pro (Mobile)',
      browser: 'Mobile Safari 17.4',
      location: 'New York, NY, United States',
      ip: '192.0.2.89',
      lastActive: '2 hours ago',
      isCurrent: false,
    },
    {
      id: 'sess-3',
      device: 'MacBook Air (Laptop)',
      browser: 'Mozilla Firefox 125.0',
      location: 'Boston, MA, United States',
      ip: '198.51.100.12',
      lastActive: 'Oct 14, 2026',
      isCurrent: false,
    },
  ]);

  updatePassword(): void {
    if (!this.currentPassword()) {
      this.passwordError.set('Please provide your current password.');
      return;
    }
    if (this.newPassword().length < 8) {
      this.passwordError.set('New password must be at least 8 characters long.');
      return;
    }
    if (this.newPassword() !== this.confirmPassword()) {
      this.passwordError.set('New password and confirmation do not match.');
      return;
    }

    this.passwordError.set('');
    this.passwordUpdated.set(true);
    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmPassword.set('');

    setTimeout(() => this.passwordUpdated.set(false), 3500);
  }

  terminateOtherSessions(): void {
    this.activeSessions.update(list => list.filter(s => s.isCurrent));
  }
}
