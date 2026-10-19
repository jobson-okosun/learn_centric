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
      label: 'Faculty Profile & Credentials',
      route: 'profile',
      description: 'Academic title, department, office & research links',
      icon: 'user',
    },
    {
      label: 'Virtual Stage & Lecture Defaults',
      route: 'classroom',
      description: 'Audio/video stream, cloud recordings & audience control',
      icon: 'video',
    },
    {
      label: 'Dispatch & Alert Channels',
      route: 'notifications',
      description: 'Student submissions, office hours & urgent mentions',
      icon: 'bell',
    },
    {
      label: 'Institutional Access & Security',
      route: 'security',
      description: 'Faculty SSO, 2FA, proctor tokens & active sessions',
      icon: 'shield-check',
    },
  ];
}
