import { Component, inject, signal, viewChild, TemplateRef, effect } from '@angular/core';
import { ZardDialogService, ZardDialogRef } from '@/shared/components/dialog';
import { ZardComboboxImports } from '@/shared/components/combobox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-resource-modal',
  imports: [ZardComboboxImports, FormsModule],
  templateUrl: './upload-resource-modal.html',
  host: {
    'class': 'hidden'
  }
})
export class UploadResourceModalComponent {
  private dialog = inject(ZardDialogService);
  private dialogRef: ZardDialogRef | null = null;
  
  modalTpl = viewChild.required<TemplateRef<any>>('modalTpl');

  // Form State
  title = signal('');
  description = signal('');
  visibility = signal('institution');
  type = signal('pdf');

  // Combobox options
  subjectOptions = [
    { value: 'biology', label: 'Biology' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'math', label: 'Mathematics' }
  ];

  levelOptions = [
    { value: '100', label: '100 Level' },
    { value: '200', label: '200 Level' },
    { value: '300', label: '300 Level' },
    { value: '400', label: '400 Level' }
  ];

  licenceOptions = [
    { value: 'own_work', label: 'Own Work' },
    { value: 'cc_by', label: 'CC BY (Attribution)' },
    { value: 'cc_by_sa', label: 'CC BY-SA (ShareAlike)' },
    { value: 'cc_by_nc', label: 'CC BY-NC (NonCommercial)' },
    { value: 'third_party', label: 'Third-party with permission' }
  ];

  constructor() {
    effect(() => {
      // Could react to changes here
    });
  }

  open() {
    // Reset form
    this.title.set('');
    this.description.set('');
    this.visibility.set('institution');
    this.type.set('pdf');

    this.dialogRef = this.dialog.create({
      zTitle: 'Upload to Library',
      zContent: this.modalTpl(),
      zHideFooter: true,
      zCustomClasses: '!max-w-[500px]'
    });
  }

  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

  save() {
    // Handle save logic
    this.close();
  }
}
