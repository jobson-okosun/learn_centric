import { Component, computed, inject, ElementRef } from '@angular/core';
import { AteAngularNodeView } from '@flogeez/angular-tiptap-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cloze-node',
  imports: [FormsModule],
  template: `
    <span class="inline-block relative group" [class.ring-2]="selected()" [class.ring-primary]="selected()">
      <input type="text"
             class="cloze-placeholder border border-gray-300 form-control mx-1 !w-40 !h-9"
             [value]="answer()"
             (input)="onInput($event)"
             (keydown)="onKeydown($event)"
             placeholder="Answer here..."
             autocomplete="off"
             spellcheck="false" />
    </span>
  `
})
export class ClozeNodeComponent extends AteAngularNodeView {
  private elementRef = inject(ElementRef);
  
  answer = computed(() => {
    return (this.attributes()?.['answer'] as string) || '';
  });

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (typeof this.getPos === 'function') {
      const pos = this.getPos();
      this.elementRef.nativeElement.dispatchEvent(new CustomEvent('update-cloze', {
        detail: { pos, answer: input.value },
        bubbles: true,
        composed: true
      }));
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Backspace' || event.key === 'Delete' || event.key.startsWith('Arrow') || event.key === 'Enter') {
        event.stopPropagation();
    }
  }
}
