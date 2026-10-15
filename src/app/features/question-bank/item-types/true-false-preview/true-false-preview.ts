import { Component, input } from '@angular/core';
import { ZardDropdownImports } from '@/shared/components/dropdown';

export interface Question {
  id: string;
  type: string;
  stem: string;
  points: number;
}

@Component({
  imports: [ZardDropdownImports],
  selector: 'app-true-false-preview',
  templateUrl: './true-false-preview.html',
})
export class TrueFalsePreview {
  question = input.required<Question>();
  index = input<number>(0);
}
