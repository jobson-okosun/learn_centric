import { ZardNavigationMenuComponent, ZardNavigationMenuImports } from '@/shared/components/navigation-menu';
import { Component, inject, viewChild, TemplateRef } from '@angular/core';
import { ZardDialogService } from '@/shared/components/dialog';
import { ZardSwitchComponent } from '@/shared/components/switch';
import { ZardComboboxComponent } from '@/shared/components/combobox';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [ZardNavigationMenuComponent, ZardNavigationMenuImports, ZardSwitchComponent, ZardComboboxComponent, FormsModule],
  selector: 'app-add-resources-dropdown',
  styleUrl: './add-resources-dropdown.css',
  templateUrl: './add-resources-dropdown.html',
})  
export class AddResourcesDropdown {
  private readonly dialog = inject(ZardDialogService);
  assignmentModal = viewChild.required<TemplateRef<any>>('createAssignmentModal');
  moduleModal = viewChild.required<TemplateRef<any>>('createModuleModal');
  lessonModal = viewChild.required<TemplateRef<any>>('createLessonModal');
  testModal = viewChild.required<TemplateRef<any>>('createTestModal');
  discussionModal = viewChild.required<TemplateRef<any>>('createDiscussionModal');
  pageModal = viewChild.required<TemplateRef<any>>('createPageModal');
  mediaModal = viewChild.required<TemplateRef<any>>('createMediaModal');
  externalLinkModal = viewChild.required<TemplateRef<any>>('createExternalLinkModal');
  headerModal = viewChild.required<TemplateRef<any>>('createHeaderModal');
  liveClassesModal = viewChild.required<TemplateRef<any>>('createLiveClassesModal');
  liveRecordingModal = viewChild.required<TemplateRef<any>>('createLiveRecordingModal');
  activeDialogRef?: any;

  assigneeOptions = [
    { label: 'Group A', value: 'group_a' },
    { label: 'Group B', value: 'group_b' },
    { label: 'Group C', value: 'group_c' }
  ];
  
  openDialog(template: TemplateRef<any>, title: string, widthClass: string = '!max-w-xl w-full') {
    this.activeDialogRef = this.dialog.create({
      zTitle: title,
      zContent: template,
      zHideFooter: true,
      zCustomClasses: widthClass,
    }); 
  }

  openAssignmentDialog() { this.openDialog(this.assignmentModal(), 'Create Assignment', '!max-w-3xl w-full'); }
  openModuleDialog() { this.openDialog(this.moduleModal(), 'Add Module'); }
  openLessonDialog() { this.openDialog(this.lessonModal(), 'Add Lesson'); }
  openTestDialog() { this.openDialog(this.testModal(), 'Create Test/Quiz', '!max-w-2xl w-full'); }
  openDiscussionDialog() { this.openDialog(this.discussionModal(), 'Create Discussion', '!max-w-2xl w-full'); }
  openPageDialog() { this.openDialog(this.pageModal(), 'Create Page', '!max-w-2xl w-full'); }
  openMediaDialog(title: string = 'Add Media') { this.openDialog(this.mediaModal(), title); }
  openExternalLinkDialog() { this.openDialog(this.externalLinkModal(), 'Add External Website'); }
  openHeaderDialog() { this.openDialog(this.headerModal(), 'Add Header'); }
  openLiveClassesDialog() { this.openDialog(this.liveClassesModal(), 'Schedule Live Class', '!max-w-xl w-full'); }
  openLiveRecordingDialog() { this.openDialog(this.liveRecordingModal(), 'Add Live Recording'); }
  closeDialog() {
    this.activeDialogRef?.close();
  }
}
