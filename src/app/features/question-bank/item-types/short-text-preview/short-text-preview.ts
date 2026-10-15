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
  selector: 'app-short-text-preview',
  templateUrl: './short-text-preview.html',
})
export class ShortTextPreview {
  question = input.required<Question>();
  index = input<number>(0);
}
