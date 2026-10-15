import { Component, input } from '@angular/core';

@Component({
  selector: 'app-question-type-preview',
  templateUrl: './question-type-preview.html',
})
export class QuestionTypePreview {
  type = input.required<string>(); 
}
