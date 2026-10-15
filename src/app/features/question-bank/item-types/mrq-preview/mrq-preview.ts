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
  selector: 'app-mrq-preview',
  templateUrl: './mrq-preview.html',
})
export class MrqPreview {
  question = input.required<Question>();
  index = input<number>(0);
}
