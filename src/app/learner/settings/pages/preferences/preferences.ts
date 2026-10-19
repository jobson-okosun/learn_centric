import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  templateUrl: './preferences.html',
  styleUrl: './preferences.css',
})
export default class Preferences {
  readonly defaultTutorMode = signal<'socratic' | 'breakdown' | 'diagnostic' | 'misconception'>('socratic');
  readonly hintPace = signal<'3-step' | '2-step' | 'direct'>('3-step');
  readonly renderLatex = signal(true);
  readonly showDerivations = signal(true);
  readonly codeLineNumbers = signal(true);
  readonly preferredCodeLang = signal('python');

  readonly defaultPlaybackSpeed = signal('1.25');
  readonly autoPlayNextLesson = signal(true);
  readonly autoAdvanceDrills = signal(false);

  readonly dailyTargetDrills = signal(5);
  readonly practiceReminderTime = signal('19:00');

  readonly saveSuccess = signal(false);

  savePreferences(): void {
    this.saveSuccess.set(true);
    setTimeout(() => this.saveSuccess.set(false), 3500);
  }
}
