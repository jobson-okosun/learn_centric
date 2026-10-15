import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardSwitchComponent } from '@/shared/components/switch';

@Component({
  selector: 'app-essay-rich-text',
  imports: [CommonModule, FormsModule, ZardSwitchComponent],
  templateUrl: './essay-rich-text.html',
})
export class EssayRichText {
  maxWords = signal<number | null>(null);
  maxLength = signal<number | null>(null);
  allowCopy = signal<boolean>(false);
  allowPaste = signal<boolean>(false);

  score = signal(1);
  penalty = signal(0);
  difficultyLevel = signal('medium');

  difficultyLevels = ['easy', 'medium', 'hard'];
}
