import { Component, signal } from '@angular/core';
import { ZardDropdownImports } from '@/shared/components/dropdown';

interface AssessmentItemOption {
  id: string;
  text: string;
}

interface AssessmentItem {
  id: string;
  type: string;
  stem: string;
  points: number;
  options?: AssessmentItemOption[];
}

@Component({
  imports: [ZardDropdownImports],
  selector: 'app-questions',
  styles: ``,
  templateUrl: './questions.html',
})
export default class Questions {
  questions = signal<AssessmentItem[]>([
    { 
      id: 'q1', 
      type: 'Multiple Choice', 
      stem: 'What is the powerhouse of the cell?', 
      points: 1,
      options: [
        { id: 'opt1', text: 'Nucleus' },
        { id: 'opt2', text: 'Ribosome' },
        { id: 'opt3', text: 'Mitochondria' },
        { id: 'opt4', text: 'Endoplasmic Reticulum' }
      ]
    },
    { 
      id: 'q2', 
      type: 'Multiple Choice', 
      stem: 'What is the powerhouse of the cell?', 
      points: 1,
      options: [
        { id: 'opt1', text: 'Nucleus' },
        { id: 'opt2', text: 'Ribosome' },
        { id: 'opt3', text: 'Mitochondria' },
        { id: 'opt4', text: 'Endoplasmic Reticulum' }
      ]
    }
  ]);
}
