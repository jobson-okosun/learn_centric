import { Component, computed, inject, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AteAngularNodeView } from '@flogeez/angular-tiptap-editor';
import katex from 'katex';

@Component({
  selector: 'app-equation-node',
  template: `
    <span 
      class="inline-flex items-center mx-1 my-0.5 relative group cursor-pointer hover:bg-gray-100 rounded px-1 transition-colors" 
      [class.ring-2]="selected()" 
      [class.ring-primary]="selected()"
      (click)="onEditEquation()"
      [innerHTML]="renderedMath()">
    </span>
  `
})
export class EquationNodeComponent extends AteAngularNodeView {
  private sanitizer = inject(DomSanitizer);
  
  latex = computed(() => {
    return (this.attributes()?.['latex'] as string) || '';
  });

  renderedMath = computed<SafeHtml>(() => {
    try {
      const html = katex.renderToString(this.latex(), { throwOnError: false });
      return this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (e) {
      return this.sanitizer.bypassSecurityTrustHtml(this.latex());
    }
  });

  private elementRef = inject(ElementRef);

  onEditEquation() {
    this.elementRef.nativeElement.dispatchEvent(new CustomEvent('edit-equation', { 
      detail: { pos: this.getPos(), latex: this.latex() },
      bubbles: true,
      composed: true
    }));
  }
}
