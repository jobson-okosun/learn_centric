import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardSwitchComponent } from '@/shared/components/switch';

export interface MatchPair {
  id: string;
  stimulus: string;
  option: string;
}

@Component({
  selector: 'app-association',
  imports: [CommonModule, FormsModule, ZardSwitchComponent],
  templateUrl: './association.html',
})
export class Association {
  pairs = signal<MatchPair[]>([
    { id: '1', stimulus: 'Capital of France', option: 'Paris' },
    { id: '2', stimulus: 'Largest planet', option: 'Jupiter' }
  ]);

  score = signal(1);
  penalty = signal(0);
  difficultyLevel = signal('medium');
  scoringType = signal('exact_match');
  matchingRule = signal('exact');
  autoScore = signal(true);

  difficultyLevels = ['easy', 'medium', 'hard'];
  scoringTypes = ['exact_match', 'partial_match'];
  matchingRules = ['exact', 'contains'];

  addPair() {
    this.pairs.update(p => [
      ...p, 
      { id: Date.now().toString(), stimulus: '', option: '' }
    ]);
  }

  removePair(index: number) {
    this.pairs.update(p => p.filter((_, i) => i !== index));
  }
}
