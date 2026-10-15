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
  selector: 'app-essay-plain-text-preview',
  templateUrl: './essay-plain-text-preview.html',
})
export class EssayPlainTextPreview {
  question = input.required<Question>();
  index = input<number>(0);
}
