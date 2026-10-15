import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export default class Settings {
  readonly activeTab = signal<'details' | 'features' | 'danger'>('details');
  
  rubricDrawerVisible = signal(false);
  criterionDrawerVisible = signal(false);
}
