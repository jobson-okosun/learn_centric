import { Component, inject, TemplateRef, signal } from '@angular/core';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports } from '@/shared/components/drawer';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';

@Component({
  imports: [ZardDropdownImports, ZardDialogImports, ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports],
  selector: 'app-members',
  styleUrl: './members.css',
  templateUrl: './members.html',
})
export default class Members {
  private dialogService = inject(ZardDialogService);
  private dialogRef: ZardDialogRef<any> | null = null;
  profileDrawerVisible = signal(false);

  openAddMemberModal(template: TemplateRef<any>) {
    this.dialogRef = this.dialogService.create({
      zTitle: 'Add Members',
      zContent: template,
      zHideFooter: true,
      zWidth: 'md',
    });
  }

  closeAddMemberModal() {
    this.dialogRef?.close();
  }
}
