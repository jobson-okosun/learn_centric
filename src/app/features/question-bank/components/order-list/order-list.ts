import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardSwitchComponent } from '@/shared/components/switch';

export interface OrderOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, FormsModule, ZardSwitchComponent],
  templateUrl: './order-list.html',
})
export class OrderList {
  options = signal<OrderOption[]>([
    { id: '1', label: 'First step in the process' },
    { id: '2', label: 'Second step in the process' },
    { id: '3', label: 'Third step in the process' }
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

  addOption() {
    this.options.update(o => [
      ...o, 
      { id: Date.now().toString(), label: '' }
    ]);
  }

  removeOption(index: number) {
    this.options.update(o => o.filter((_, i) => i !== index));
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C, D...
  }
}
