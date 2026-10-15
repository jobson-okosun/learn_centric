import { Component, inject, TemplateRef } from '@angular/core';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';
import { ZardSwitchComponent } from '@/shared/components/switch';

@Component({
  selector: 'app-live',
  imports: [ZardDialogImports, ZardSwitchComponent],
  templateUrl: './live.html',
  styleUrl: './live.css'
})
export default class Live {
  private dialogService = inject(ZardDialogService);
  private dialogRef: ZardDialogRef<any> | null = null;

  openScheduleModal(template: TemplateRef<any>) {
    this.dialogRef = this.dialogService.create({
      zTitle: 'Schedule Live Session',
      zContent: template,
      zHideFooter: true,
      zWidth: 'md',
    });
  }

  closeScheduleModal() {
    this.dialogRef?.close();
  }
}
