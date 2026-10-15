import { Component, computed, signal, inject, ElementRef, viewChild, TemplateRef } from '@angular/core';
import { AteAngularNodeView } from '@flogeez/angular-tiptap-editor';
import { FormsModule } from '@angular/forms';
import { ZardDialogService, ZardDialogRef } from '@/shared/components/dialog';
import { ZardSonnerService } from '@/shared/components/sonner/sonner.service';

@Component({
  selector: 'app-cloze-radio-node',
  imports: [FormsModule],
  template: `
    <span class="inline-flex items-center gap-1 mx-1 cloze-radio-container align-middle relative border border-dashed border-gray-300 p-1 rounded-md bg-gray-50" contenteditable="false">
      
      <div class="flex items-center gap-3">
        @for (opt of options(); track opt.value; let i = $index) {
          <label class="flex items-center gap-1.5 cursor-pointer text-[13px] text-gray-800 m-0 leading-none hover:text-primary transition-colors">
            <input type="radio" 
                   [name]="radioGroupName" 
                   [value]="opt.value" 
                   [checked]="opt.value === correctAnswer()"
                   (mousedown)="$event.stopPropagation()"
                   (change)="onCorrectAnswerChange(opt.value)"
                   class="w-3.5 h-3.5 accent-primary border-gray-300 m-0 cursor-pointer">
            <span (mousedown)="$event.stopPropagation()" (click)="onCorrectAnswerChange(opt.value)">{{ opt.label }}</span>
          </label>
        }
        @if (options().length === 0) {
          <span class="text-xs text-gray-500 italic m-0 px-2">No options added</span>
        }
      </div>

      <button type="button" (click)="openModal()" class="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-colors shadow-sm outline-none shrink-0 ml-1" title="Configure options">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
      </button>
    </span>
    
    <ng-template #configModalTemplate>
      <div class="flex flex-col gap-3">
        <p class="text-sm text-gray-500 mb-2">Add options below. Whichever option you select in the editor will be saved as the correct answer.</p>
        @for (opt of modalOptions(); track opt.value; let i = $index) {
          <div class="flex items-center gap-2">
            <input type="text" 
                   [value]="opt.label" 
                   (input)="updateModalOption(i, $any($event.target).value)" 
                   class="flex-1 h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                   placeholder="Enter option text..." />
            <button type="button" 
                    (click)="removeModalOption(i)" 
                    [disabled]="modalOptions().length <= 1" 
                    class="text-red-500 w-10 h-10 flex items-center justify-center hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Remove Option">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        }
        <button type="button" (click)="addModalOption()" class="text-primary text-sm font-medium hover:underline self-start mt-2 outline-none flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add Option
        </button>
      </div>
    </ng-template>
  `,
  styles: [`
    .cloze-radio-container {
      user-select: none;
    }
  `]
})
export class ClozeRadioNodeComponent extends AteAngularNodeView {
  
  private sonnerService = inject(ZardSonnerService);
  private dialogService = inject(ZardDialogService);

  private activeDialogRef: ZardDialogRef<any> | null = null;
  configModalTemplate = viewChild.required<TemplateRef<any>>('configModalTemplate');
  
  radioGroupName = 'cloze-radio-' + Date.now() + Math.floor(Math.random() * 1000);

  options = computed(() => {
    const rawOptions = this.attributes()?.['options'];
    if (typeof rawOptions === 'string') {
      try { return JSON.parse(rawOptions); } catch (e) { return [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]; }
    }
    return Array.isArray(rawOptions) ? rawOptions : [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }];
  });

  correctAnswer = computed<string>(() => {
    const val = this.attributes()?.['correctAnswer'];
    return typeof val === 'string' ? val : '';
  });

  modalOptions = signal<{label: string, value: string}[]>([]);

  openModal() {
    this.modalOptions.set(JSON.parse(JSON.stringify(this.options())));
    this.activeDialogRef = this.dialogService.create({
      zTitle: 'Configure Radio Options',
      zContent: this.configModalTemplate(),
      zWidth: '450px',
      zOkText: 'Done',
      zOnOk: () => this.saveOptions(),
      zCancelText: 'Cancel'
    });
  }

  addModalOption() {
    this.modalOptions.update(opts => [...opts, { label: `Option ${opts.length + 1}`, value: Date.now().toString() }]);
  }

  removeModalOption(index: number) {
    this.modalOptions.update(opts => {
      opts.splice(index, 1);
      return [...opts];
    });
  }

  updateModalOption(index: number, label: string) {
    this.modalOptions.update(opts => {
      opts[index].label = label;
      return [...opts];
    });
  }

  saveOptions() {
    this.updateAttributes({ options: this.modalOptions() });
    
    const currentAnswer = this.correctAnswer();
    const exists = this.modalOptions().find(o => o.value === currentAnswer);
    if (!exists) {
        this.updateAttributes({ correctAnswer: '' });
    }

    if (this.activeDialogRef) {
      this.activeDialogRef.close();
      this.activeDialogRef = null;
    }
  }

  onCorrectAnswerChange(value: string) {
    if (this.correctAnswer() === value) return; 
    
    setTimeout(() => {
      if (typeof this.getPos === 'function') {
        const pos = this.getPos();
        const editorInstance = typeof this.editor === 'function' ? (this.editor as any)() : this.editor;
        const tr = editorInstance.view.state.tr;
        const node = editorInstance.view.state.doc.nodeAt(pos);
        if (node) {
          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            correctAnswer: value
          });
          editorInstance.view.dispatch(tr);
        }
      } else {
        this.updateAttributes({ correctAnswer: value });
      }

      const selectedOption = this.options().find((o: any) => o.value === value);
      const label = selectedOption ? selectedOption.label : 'An option';
      this.sonnerService.success(`Correct answer set to "${label}"`);
    });
  }
}
