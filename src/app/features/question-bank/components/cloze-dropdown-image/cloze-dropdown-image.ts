import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardSwitchComponent } from '@/shared/components/switch';

export interface DropdownOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ImageDropdownLabel {
  id: string;
  x: number;
  y: number;
  direction: 'LEFT' | 'RIGHT';
  options: DropdownOption[];
}

@Component({
  selector: 'app-cloze-dropdown-image',
  imports: [CommonModule, FormsModule, ZardSwitchComponent],
  templateUrl: './cloze-dropdown-image.html',
})
export class ClozeDropdownImage {
  imageUploaded = signal<boolean>(true);
  imageUrl = signal<string>('assets/placeholder-image.png');
  imageAltText = signal<string>('Sample Diagram');
  
  labels = signal<ImageDropdownLabel[]>([
    { 
      id: '1', x: 20, y: 30, direction: 'LEFT', 
      options: [
        { id: 'opt1', text: 'Nucleus', isCorrect: true },
        { id: 'opt2', text: 'Cell Wall', isCorrect: false }
      ] 
    }
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

  addLabel() {
    this.labels.update(l => [
      ...l, 
      { 
        id: Date.now().toString(), x: 50, y: 50, direction: 'LEFT', 
        options: [{ id: Date.now().toString() + '_1', text: '', isCorrect: true }] 
      }
    ]);
  }

  deleteLabel(index: number) {
    this.labels.update(l => l.filter((_, i) => i !== index));
  }

  updateLabelDirection(index: number, direction: 'LEFT' | 'RIGHT') {
    this.labels.update(l => {
      const newL = [...l];
      newL[index].direction = direction;
      return newL;
    });
  }

  addOption(labelIndex: number) {
    this.labels.update(l => {
      const newL = [...l];
      newL[labelIndex].options.push({ id: Date.now().toString(), text: '', isCorrect: false });
      return newL;
    });
  }

  removeOption(labelIndex: number, optionIndex: number) {
    this.labels.update(l => {
      const newL = [...l];
      if (newL[labelIndex].options.length > 1) {
        newL[labelIndex].options.splice(optionIndex, 1);
        if (!newL[labelIndex].options.find(o => o.isCorrect)) {
          newL[labelIndex].options[0].isCorrect = true;
        }
      }
      return newL;
    });
  }

  setCorrectOption(labelIndex: number, optionIndex: number) {
    this.labels.update(l => {
      const newL = [...l];
      newL[labelIndex].options.forEach((o, i) => o.isCorrect = (i === optionIndex));
      return newL;
    });
  }
}
