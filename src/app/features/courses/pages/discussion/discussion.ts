import { Component, inject, TemplateRef } from '@angular/core';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';

@Component({
  imports: [ZardDialogImports],
  selector: 'app-discussion',
  styleUrl: './discussion.css',
  templateUrl: './discussion.html',
})
export default class Discussion {
  private dialogService = inject(ZardDialogService);
  private dialogRef: ZardDialogRef<any> | null = null;

  openNewDiscussionModal(template: TemplateRef<any>) {
    this.dialogRef = this.dialogService.create({
      zTitle: 'Start a New Discussion',
      zContent: template,
      zHideFooter: true,
      zWidth: 'md',
    });
  }

  closeNewDiscussionModal() {
    this.dialogRef?.close();
  }
}
