import { Component, inject, signal, viewChild, TemplateRef, effect } from '@angular/core';
import { ZardDialogService, ZardDialogRef } from '@/shared/components/dialog';
import { ZardComboboxImports } from '@/shared/components/combobox';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

export interface CourseMock {
  value: string;
  label: string;
}

export interface TreeMock {
  id: string;
  title: string;
  type: 'module' | 'lesson';
  expanded?: boolean;
  children?: TreeMock[];
}

@Component({
  selector: 'app-use-in-course-modal',
  imports: [ZardComboboxImports, FormsModule, NgTemplateOutlet],
  templateUrl: './use-in-course-modal.html',
})
export class UseInCourseModalComponent {
  private readonly dialog = inject(ZardDialogService);
  modalTemplate = viewChild.required<TemplateRef<any>>('modalTpl');
  private activeDialogRef: ZardDialogRef<any> | null = null;
  
  // State
  step = signal<1 | 2>(1);
  selectedCourseId = signal<string>('');
  selectedNodeId = signal<string>('root');
  
  // Mock Data
  courses = signal<CourseMock[]>([
    { value: 'c1', label: 'Biology 101' },
    { value: 'c2', label: 'Introduction to Genetics' },
    { value: 'c3', label: 'Advanced Chemistry' }
  ]);
  
  courseTree = signal<TreeMock[]>([
    {
      id: 'm1',
      title: 'Module 1: Cell Structure',
      type: 'module',
      expanded: true,
      children: [
        { id: 'l1', title: 'Lesson 1: The Nucleus', type: 'lesson' },
        { id: 'l2', title: 'Lesson 2: Mitochondria', type: 'lesson' }
      ]
    },
    {
      id: 'm2',
      title: 'Module 2: Cellular Respiration',
      type: 'module',
      expanded: false,
      children: [
        { id: 'l3', title: 'Lesson 1: Glycolysis', type: 'lesson' }
      ]
    }
  ]);
  
  open() {
    this.step.set(1);
    this.selectedCourseId.set('');
    this.selectedNodeId.set('root');
    this.activeDialogRef = this.dialog.create({
      zTitle: 'Add to Course',
      zContent: this.modalTemplate(),
      zHideFooter: true,
      zCustomClasses: '!max-w-2xl w-full'
    });
  }
  
  close() {
    this.activeDialogRef?.close();
  }
  
  nextStep() {
    if (this.selectedCourseId()) {
      this.step.set(2);
    }
  }
  
  backStep() {
    this.step.set(1);
  }
  
  confirm() {
    // Backend API call would happen here
    console.log('Adding to course:', this.selectedCourseId(), 'at node:', this.selectedNodeId());
    this.close();
  }
  
  toggleNode(node: TreeMock) {
    node.expanded = !node.expanded;
    this.courseTree.update(t => [...t]);
  }
}
