import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiptapEditor } from '@/shared/components/tiptap-editor/tiptap-editor';
import { ZardSwitchComponent } from '@/shared/components/switch';

export interface MultipleChoiceOption {
  id: string;
  label: string;
  isChecked: boolean;
}

@Component({
  selector: 'app-mcq-multiple-choice',
  imports: [CommonModule, FormsModule, TiptapEditor, ZardSwitchComponent],
  templateUrl: './mcq-multiple-choice.html',
})
export class McqMultipleChoice {
  options = signal<MultipleChoiceOption[]>([
    { id: Date.now().toString(), label: '', isChecked: true },
    { id: (Date.now() + 1).toString(), label: '', isChecked: false }
  ]);

  score = signal(1);
  penalty = signal(0);
  scoringType = signal('exact_match');
  matchingRule = signal('exact');
  difficultyLevel = signal('medium');
  shuffleOptions = signal(true);
  autoScore = signal(true);

  scoringTypes = ['exact_match', 'partial_match'];
  matchingRules = ['exact', 'contains'];
  difficultyLevels = ['easy', 'medium', 'hard'];

  addOption() {
    this.options.update(opts => [...opts, { id: Date.now().toString(), label: '', isChecked: false }]);
  }

  removeOption(index: number) {
    this.options.update(opts => {
      opts.splice(index, 1);
      return [...opts];
    });
  }

  toggleCorrectOption(index: number) {
    this.options.update(opts => {
      opts[index].isChecked = !opts[index].isChecked;
      return [...opts];
    });
  }
}
