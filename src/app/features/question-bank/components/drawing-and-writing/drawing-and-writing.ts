import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardSwitchComponent } from '@/shared/components/switch';

export interface DrawingSubQuestion {
  id: string;
  stimulus: string;
  backgroundType: string;
  score: number;
}

@Component({
  selector: 'app-drawing-and-writing',
  imports: [CommonModule, FormsModule, ZardSwitchComponent],
  templateUrl: './drawing-and-writing.html',
})
export class DrawingAndWriting {
  backgroundTypes = ['Blank', 'Lined', 'Graph', 'Grid'];
  globalBackground = signal('Blank');

  subQuestions = signal<DrawingSubQuestion[]>([
    { id: '1', stimulus: 'Draw a circle.', backgroundType: 'Blank', score: 1 }
  ]);

  score = signal(1);
  penalty = signal(0);
  difficultyLevel = signal('medium');
  scoringType = signal('exact_match');
  matchingRule = signal('exact');
  autoScore = signal(false);

  difficultyLevels = ['easy', 'medium', 'hard'];
  scoringTypes = ['exact_match', 'partial_match'];
  matchingRules = ['exact', 'contains'];

  addSubQuestion() {
    this.subQuestions.update(sq => [
      ...sq, 
      { id: Date.now().toString(), stimulus: '', backgroundType: 'Blank', score: 1 }
    ]);
  }

  deleteSubQuestion(index: number) {
    this.subQuestions.update(sq => sq.filter((_, i) => i !== index));
  }
}
