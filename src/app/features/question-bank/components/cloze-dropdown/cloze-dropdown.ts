import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardSwitchComponent } from '@/shared/components/switch';

@Component({
  selector: 'app-cloze-dropdown',
  imports: [CommonModule, FormsModule, ZardSwitchComponent],
  templateUrl: './cloze-dropdown.html',
})
export class ClozeDropdown {
  score = signal(1);
  penalty = signal(0);
  difficultyLevel = signal('medium');
  scoringType = signal('exact_match');
  matchingRule = signal('exact');
  autoScore = signal(true);

  difficultyLevels = ['easy', 'medium', 'hard'];
  scoringTypes = ['exact_match', 'partial_match'];
  matchingRules = ['exact', 'contains'];
}
