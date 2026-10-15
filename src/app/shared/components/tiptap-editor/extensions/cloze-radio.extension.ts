import { Injector } from '@angular/core';
import { createAngularComponentExtension } from '@flogeez/angular-tiptap-editor';
import { ClozeRadioNodeComponent } from '../nodes/cloze-radio-node.component';

export const ClozeRadioExtension = (injector: Injector) => {
  return createAngularComponentExtension(injector, {
    name: 'clozeRadio',
    component: ClozeRadioNodeComponent,
    group: 'inline',
    draggable: true,

    parseHTML: () => [
      { tag: 'cloze-radio-node' } 
    ],
    renderHTML: ({ HTMLAttributes, node }) => {
      return ['cloze-radio-node', {
        'data-options': JSON.stringify(node?.attrs?.['options'] || HTMLAttributes['options'] || []),
        'data-correct-answer': node?.attrs?.['correctAnswer'] ?? HTMLAttributes['correctAnswer'] ?? ''
      }];
    },
  }).extend({
    inline: true,
    addAttributes() {
      return {
        options: {
          default: [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }],
          parseHTML: (element: any) => {
            const raw = element.getAttribute('data-options');
            if (raw) {
              try { return JSON.parse(raw); } catch(e) { return null; }
            }
            return null;
          }
        },
        correctAnswer: {
          default: '',
          parseHTML: (element: any) => element.getAttribute('data-correct-answer') || '',
        }
      }
    },
    addCommands() {
      return {
        insertClozeRadio: (options?: any) => ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              options: options?.options || [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }],
              correctAnswer: options?.correctAnswer || ''
            }
          });
        }
      } as any;
    }
  });
};
