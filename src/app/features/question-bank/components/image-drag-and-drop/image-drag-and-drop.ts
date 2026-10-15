import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardSwitchComponent } from '@/shared/components/switch';

export interface ImageDropZone {
  id: string;
  x: number;
  y: number;
  direction: 'LEFT' | 'RIGHT';
  inputValue: string;
}

@Component({
  selector: 'app-image-drag-and-drop',
  imports: [CommonModule, FormsModule, ZardSwitchComponent],
  templateUrl: './image-drag-and-drop.html',
})
export class ImageDragAndDrop {
  imageUploaded = signal<boolean>(true);
  imageUrl = signal<string>('assets/placeholder-image.png');
  imageAltText = signal<string>('Sample Diagram');
  
  labels = signal<ImageDropZone[]>([
    { id: '1', x: 20, y: 30, direction: 'LEFT', inputValue: 'Nucleus' },
    { id: '2', x: 60, y: 50, direction: 'RIGHT', inputValue: 'Mitochondria' }
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
      { id: Date.now().toString(), x: 50, y: 50, direction: 'LEFT', inputValue: '' }
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
}
