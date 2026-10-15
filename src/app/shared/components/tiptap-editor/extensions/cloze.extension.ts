import { Injector } from '@angular/core';
import { createAngularComponentExtension } from '@flogeez/angular-tiptap-editor';
import { ClozeNodeComponent } from '../nodes/cloze-node.component';

export const ClozeExtension = (injector: Injector) => {
  return createAngularComponentExtension(injector, {
    name: 'cloze',
    component: ClozeNodeComponent,
    group: 'inline',
    draggable: true,

    parseHTML: () => [
      { tag: 'input.cloze-placeholder' },
      { tag: 'cloze-node' } 
    ],
    renderHTML: ({ HTMLAttributes, node }) => {
      const answer = node?.attrs?.['answer'] ?? HTMLAttributes['answer'] ?? '';
      return ['input', {
        type: 'text',
        class: 'cloze-placeholder',
        'data-answer': answer,
        value: answer
      }];
    },
  }).extend({
    inline: true,
    addAttributes() {
      return {
        answer: {
          default: '',
          parseHTML: (element: any) => element.getAttribute('data-answer') || '',
        }
      }
    },
    addCommands() {
      return {
        insertCloze: (options?: { answer?: string }) => ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: { answer: options?.answer || '' }
          });
        }
      } as any;
    }
  });
};
