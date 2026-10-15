import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardSwitchComponent } from '@/shared/components/switch';

@Component({
  selector: 'app-essay-plain-text',
  imports: [CommonModule, FormsModule, ZardSwitchComponent],
  templateUrl: './essay-plain-text.html',
})
export class EssayPlainText {
  maxWords = signal<number | null>(null);
  maxLength = signal<number | null>(null);
  allowCopy = signal<boolean>(false);
  allowPaste = signal<boolean>(false);

  score = signal(1);
  penalty = signal(0);
  difficultyLevel = signal('medium');

  difficultyLevels = ['easy', 'medium', 'hard'];
}
