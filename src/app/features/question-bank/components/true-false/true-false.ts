import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardSwitchComponent } from '@/shared/components/switch';

@Component({
  selector: 'app-true-false',
  imports: [CommonModule, FormsModule],
  templateUrl: './true-false.html',
})
export class TrueFalse {
  correctAnswer = signal<'true' | 'false'>('true');

  score = signal(1);
  penalty = signal(0);
  difficultyLevel = signal('medium');

  difficultyLevels = ['easy', 'medium', 'hard'];

  setCorrect(answer: 'true' | 'false') {
    this.correctAnswer.set(answer);
  }
}
