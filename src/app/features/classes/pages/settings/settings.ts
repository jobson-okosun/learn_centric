import { Component, signal } from '@angular/core';
import { ZardComboboxComponent, ZardComboboxImports } from '@/shared/components/combobox';

@Component({
  imports: [ZardComboboxComponent, ZardComboboxImports],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export default class Settings {
  activeTab = signal<'details' | 'access' | 'grading' | 'features' | 'danger'>('details');
}
