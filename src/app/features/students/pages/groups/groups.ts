import { Component, signal, inject, viewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { ZardDrawerImports } from '@/shared/components/drawer';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';

interface Group {
  id: string;
  name: string;
  course: string;
  className: string;
  membersCount: number;
}

@Component({
  selector: 'app-global-groups',
  imports: [CommonModule, FormsModule, ZardDropdownImports, ZardDrawerImports, ZardDialogImports],
  templateUrl: './groups.html'
})
export default class GlobalGroups {
  private readonly dialogService = inject(ZardDialogService);
  addStudentTemplate = viewChild.required<TemplateRef<any>>('addStudentTemplate');
  activeDialogRef: ZardDialogRef<any> | null = null;
  
  searchQuery = signal('');
  
  groups = signal<Group[]>([
    { id: 'g1', name: 'Project Team Alpha', course: 'Biology 201', className: 'Cohort A', membersCount: 4 },
    { id: 'g2', name: 'Study Group 1', course: 'Physics 101', className: 'Cohort B', membersCount: 6 },
    { id: 'g3', name: 'Project Team Beta', course: 'Biology 201', className: 'Cohort A', membersCount: 3 }
  ]);

  isCreateDrawerOpen = signal(false);
  newGroupName = signal('');
  newGroupCourse = signal('');
  newGroupClass = signal('');
  
  openCreateDrawer() {
    this.isCreateDrawerOpen.set(true);
  }
  
  closeCreateDrawer() {
    this.isCreateDrawerOpen.set(false);
  }

  openManageMembers() {
    this.activeDialogRef = this.dialogService.create({
      zTitle: 'Manage Group Members',
      zContent: this.addStudentTemplate(),
      zHideFooter: true,
      zCustomClasses: '!max-w-md w-full',
    });
  }

  closeStudentDialog() {
    this.activeDialogRef?.close();
  }
}
