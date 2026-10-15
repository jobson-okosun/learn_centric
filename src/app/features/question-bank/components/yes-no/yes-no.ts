import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardSwitchComponent } from '@/shared/components/switch';

@Component({
  selector: 'app-yes-no',
  imports: [CommonModule, FormsModule],
  templateUrl: './yes-no.html',
})
export class YesNo {
  correctAnswer = signal<'yes' | 'no'>('yes');

  score = signal(1);
  penalty = signal(0);
  difficultyLevel = signal('medium');

  difficultyLevels = ['easy', 'medium', 'hard'];

  setCorrect(answer: 'yes' | 'no') {
    this.correctAnswer.set(answer);
  }
}
