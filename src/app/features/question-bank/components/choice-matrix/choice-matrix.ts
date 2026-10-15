import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiptapEditor } from '@/shared/components/tiptap-editor/tiptap-editor';
import { ZardSwitchComponent } from '@/shared/components/switch';

@Component({
  selector: 'app-choice-matrix',
  imports: [CommonModule, FormsModule, TiptapEditor, ZardSwitchComponent],
  templateUrl: './choice-matrix.html',
})
export class ChoiceMatrix {
  stems = signal<string[]>(['', '']);
  options = signal<{label: string, value: string}[]>([
    { label: '', value: '0' },
    { label: '', value: '1' }
  ]);
  answers = signal<(string | null)[]>([null, null]);

  score = signal(1);
  penalty = signal(0);
  difficultyLevel = signal('medium');
  scoringType = signal('exact_match');
  matchingRule = signal('exact');
  shuffleOptions = signal(true);
  autoScore = signal(true);

  difficultyLevels = ['easy', 'medium', 'hard'];
  scoringTypes = ['exact_match', 'partial_match'];
  matchingRules = ['exact', 'contains'];

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  addStem() {
    this.stems.update(s => [...s, '']);
    this.answers.update(a => [...a, null]);
  }

  removeStem(index: number) {
    if (this.stems().length <= 1) return;
    this.stems.update(s => s.filter((_, i) => i !== index));
    this.answers.update(a => a.filter((_, i) => i !== index));
  }

  updateStem(index: number, content: string) {
    this.stems.update(s => {
      const newStems = [...s];
      newStems[index] = content;
      return newStems;
    });
  }

  addOption() {
    this.options.update(o => [...o, { label: '', value: String(Date.now()) }]);
  }

  removeOption(index: number) {
    if (this.options().length <= 2) return;
    this.options.update(o => o.filter((_, i) => i !== index));
  }

  updateOption(index: number, content: string) {
    this.options.update(o => {
      const newOpts = [...o];
      newOpts[index].label = content;
      return newOpts;
    });
  }

  setAnswer(stemIndex: number, optionValue: string) {
    this.answers.update(ans => {
      const newAns = [...ans];
      newAns[stemIndex] = optionValue;
      return newAns;
    });
  }
}
