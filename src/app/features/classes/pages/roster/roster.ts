import { Component, inject, TemplateRef, signal } from '@angular/core';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports } from '@/shared/components/drawer';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ZardDropdownImports, ZardDialogImports, ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports, RouterLink],
  selector: 'app-roster',
  styleUrl: './roster.css',
  templateUrl: './roster.html',
})
export default class Roster {
  private dialogService = inject(ZardDialogService);
  private dialogRef: ZardDialogRef<any> | null = null;
  profileDrawerVisible = signal(false);

  openAddStudentModal(template: TemplateRef<any>) {
    this.dialogRef = this.dialogService.create({
      zTitle: 'Add Students',
      zContent: template,
      zHideFooter: true,
      zWidth: 'md',
    });
  }

  closeAddStudentModal() {
    this.dialogRef?.close();
  }
}
