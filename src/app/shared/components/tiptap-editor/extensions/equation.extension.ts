import { Injector } from '@angular/core';
import { createAngularComponentExtension } from '@flogeez/angular-tiptap-editor';
import { EquationNodeComponent } from '../nodes/equation-node.component';
import katex from 'katex';

export const EquationExtension = (injector: Injector) => {
  return createAngularComponentExtension(injector, {
    name: 'equation',
    component: EquationNodeComponent,
    group: 'inline',
    draggable: true,
    attributes: {
      latex: {
        default: '\\text{Math}',
        parseHTML: element => element.getAttribute('data-latex') || element.getAttribute('latex') || '',
      },
    },
    parseHTML: () => [
      { tag: 'span.math-expression' },
      { tag: 'equation-node' } // For backwards compatibility
    ],
    renderHTML: ({ HTMLAttributes }) => {
      const latex = HTMLAttributes['latex'] || '';
      const span = document.createElement('span');
      span.className = 'math-expression';
      span.setAttribute('data-latex', latex);
      span.contentEditable = 'false';
      
      try {
        span.innerHTML = katex.renderToString(latex, { throwOnError: false });
      } catch (e) {
        span.innerText = latex;
      }
      
      return { dom: span };
    },
  }).extend({
    inline: true,
    addCommands() {
      return {
        insertEquation: (options: { latex: string }) => ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: { latex: options?.latex || '' }
          });
        }
      } as any;
    }
  });
};
