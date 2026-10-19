import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ActiveFacultySession {
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
  readonly requireMfaForGradePublish = signal(true);
  readonly requireSafeExamBrowser = signal(true);

  readonly proctorToken = signal('SEC-PROCTOR-9941-K8L');
  readonly tokenGeneratedAt = signal('Generated today at 08:30 AM');
  readonly copiedToken = signal(false);

  readonly passwordUpdated = signal(false);
  readonly passwordError = signal('');

  readonly activeSessions = signal<ActiveFacultySession[]>([
    {
      id: 'sess-1',
      device: 'Faculty Dell Precision 5680 (Workstation)',
      browser: 'Google Chrome 124.0 (Windows)',
      location: 'Science Complex, Suite 402, Campus LAN',
      ip: '140.211.9.45',
      lastActive: 'Active now',
      isCurrent: true,
    },
    {
      id: 'sess-2',
      device: 'Apple iPad Pro 12.9 (Lecture Stage)',
      browser: 'Safari Mobile 17.4 (iOS)',
      location: 'Hall B Auditorium, Campus Wi-Fi',
      ip: '140.211.14.88',
      lastActive: '1 hour ago',
      isCurrent: false,
    },
    {
      id: 'sess-3',
      device: 'MacBook Pro 16" (Home Office)',
      browser: 'Mozilla Firefox 125.0 (macOS)',
      location: 'New York, NY (Home VPN)',
      ip: '67.180.204.12',
      lastActive: 'Yesterday, 8:45 PM',
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

  rotateProctorToken(): void {
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.proctorToken.set(`SEC-PROCTOR-${randomNum}-${randomHex}`);
    this.tokenGeneratedAt.set('Just regenerated now');
  }

  copyProctorToken(): void {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(this.proctorToken());
    }
    this.copiedToken.set(true);
    setTimeout(() => this.copiedToken.set(false), 2000);
  }

  terminateOtherSessions(): void {
    this.activeSessions.update(list => list.filter(s => s.isCurrent));
  }
}
