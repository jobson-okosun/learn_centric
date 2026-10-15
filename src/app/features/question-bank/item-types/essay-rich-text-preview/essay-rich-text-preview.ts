import { Component, input } from '@angular/core';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { TiptapEditor } from '@/shared/components/tiptap-editor/tiptap-editor';

export interface Question {
  id: string;
  type: string;
  stem: string;
  points: number;
}

@Component({
  imports: [ZardDropdownImports, TiptapEditor],
  selector: 'app-essay-rich-text-preview',
  templateUrl: './essay-rich-text-preview.html',
})
export class EssayRichTextPreview {
  question = input.required<Question>();
  index = input<number>(0);
}
