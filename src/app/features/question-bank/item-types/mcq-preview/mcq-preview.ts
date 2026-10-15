import { Component, input } from '@angular/core';
import { ZardDropdownImports } from '@/shared/components/dropdown';

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
}

@Component({
  imports: [ZardDropdownImports],
  selector: 'app-mcq-preview',
  templateUrl: './mcq-preview.html',
})
export class McqPreview {
  question = input.required<Question>();
  index = input<number>(0);
}
