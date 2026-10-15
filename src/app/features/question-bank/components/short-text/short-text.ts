import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardSwitchComponent } from '@/shared/components/switch';

@Component({
  selector: 'app-short-text',
  imports: [CommonModule, FormsModule, ZardSwitchComponent],
  templateUrl: './short-text.html',
})
export class ShortText {
  correctAnswer = signal<string>('');
  isNumeric = signal<boolean>(false);

  score = signal(1);
  penalty = signal(0);
  difficultyLevel = signal('medium');
  autoScore = signal(true);

  difficultyLevels = ['easy', 'medium', 'hard'];
}
