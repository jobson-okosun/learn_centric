import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiptapEditor } from '@/shared/components/tiptap-editor/tiptap-editor';
import { ZardSwitchComponent } from '@/shared/components/switch';

export interface SingleChoiceOption {
  id: string;
  label: string;
  isChecked: boolean;
}

@Component({
  selector: 'app-mcq-single-choice',
  imports: [CommonModule, FormsModule, TiptapEditor, ZardSwitchComponent],
  templateUrl: './mcq-single-choice.html',
})
export class McqSingleChoice {
  options = signal<SingleChoiceOption[]>([
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
      if (opts.length && !opts.some(o => o.isChecked)) {
        opts[0].isChecked = true;
      }
      return [...opts];
    });
  }

  toggleCorrectOption(index: number) {
    this.options.update(opts => {
      opts.forEach((o, i) => o.isChecked = i === index);
      return [...opts];
    });
  }
}
