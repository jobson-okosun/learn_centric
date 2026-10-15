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
  selector: 'app-yes-no-preview',
  templateUrl: './yes-no-preview.html',
})
export class YesNoPreview {
  question = input.required<Question>();
  index = input<number>(0);
}
