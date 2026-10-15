import { Component, input } from '@angular/core';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { CommonModule } from '@angular/common';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: string;
  stem: string;
  points: number;
  options?: QuestionOption[];
  stems?: string[];
}

@Component({
  imports: [CommonModule, ZardDropdownImports],
  selector: 'app-choice-matrix-preview',
  templateUrl: './choice-matrix-preview.html',
})
export class ChoiceMatrixPreview {
  question = input.required<Question>();
  index = input<number>(0);
}
