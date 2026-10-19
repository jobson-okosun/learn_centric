import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export default class Shell {
  readonly navItems = [
    {
      label: 'Profile & Personal Info',
      route: 'profile',
      description: 'Avatar, name, contact info, bio & timezone',
      icon: 'user',
    },
    {
      label: 'Academic & Degree Status',
      route: 'academic',
      description: 'Program, UID, GPA, advisor & enrolled cohorts',
      icon: 'academic-cap',
    },
    {
      label: 'Notification Channels',
      route: 'notifications',
      description: 'Email, SMS, WhatsApp & In-app alert preferences',
      icon: 'bell',
    },
    {
      label: 'Study & AI Tutor',
      route: 'preferences',
      description: 'Pedagogy mode, hint pace, math & code display',
      icon: 'sparkles',
    },
    {
      label: 'Security & Privacy',
      route: 'security',
      description: 'Password, 2FA, active sessions & leaderboard visibility',
      icon: 'shield-check',
    },
  ];
}
