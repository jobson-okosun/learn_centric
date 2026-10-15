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
  selector: 'app-cloze-text-preview',
  templateUrl: './cloze-text-preview.html',
})
export class ClozeTextPreview {
  question = input.required<Question>();
  index = input<number>(0);
}
