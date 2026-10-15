import { Component, signal, viewChild, TemplateRef, inject } from '@angular/core';
import { ZardDrawerImports } from '@/shared/components/drawer';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { DatePipe } from '@angular/common';

@Component({
  imports: [ZardDrawerImports, ZardDialogImports, ZardDropdownImports, DatePipe],
  selector: 'app-rubrics-list',
  templateUrl: './list.html',
})
export default class List {
  private readonly dialogService = inject(ZardDialogService);
  
  editModalTemplate = viewChild.required<TemplateRef<any>>('editModalTemplate');
  activeDialogRef: ZardDialogRef<any> | null = null;
  
  rubricDrawerVisible = signal(false);
  criterionDrawerVisible = signal(false);
  levelDrawerVisible = signal(false);

  selectedType = signal('analytic');
  editingRubric = signal<any>(null);

  rubricsList = signal<any[]>([
    { 
      id: '1', name: 'Standard Essay Rubric', model: 'Analytic', status: 'Approved', date: new Date('2026-09-12'),
      criteria: [
        { name: 'Knowledge', description: 'Understanding of topic', points: 4, levels: [{name: 'Excellent (4 pts)'}, {name: 'Good (3 pts)'}, {name: 'Fair (2 pts)'}, {name: 'Poor (1 pt)'}] },
        { name: 'Reasoning', description: 'Logical flow & argument', points: 4, levels: [{name: 'Excellent (4 pts)'}, {name: 'Good (3 pts)'}, {name: 'Fair (2 pts)'}, {name: 'Poor (1 pt)'}] },
        { name: 'Accuracy', description: 'Factual correctness', points: 4, levels: [{name: 'Excellent (4 pts)'}, {name: 'Good (3 pts)'}, {name: 'Fair (2 pts)'}, {name: 'Poor (1 pt)'}] }
      ]
    },
    { 
      id: '2', name: 'Oral Presentation Rubric', model: 'Analytic', status: 'Draft', date: new Date('2026-09-20'),
      criteria: [
        { name: 'Delivery', description: 'Pacing and volume', points: 5, levels: [{name: 'Excellent (5 pts)'}, {name: 'Good (4 pts)'}, {name: 'Fair (3 pts)'}, {name: 'Poor (1 pt)'}] },
        { name: 'Visual Aids', description: 'Quality of slides', points: 5, levels: [{name: 'Excellent (5 pts)'}, {name: 'Good (4 pts)'}, {name: 'Fair (3 pts)'}, {name: 'Poor (1 pt)'}] }
      ]
    },
    { 
      id: '3', name: 'Creative Writing Holistic', model: 'Holistic', status: 'Approved', date: new Date('2026-09-05'),
      levels: [
        { name: 'Exceeds Expectations', points: 5, description: 'The writing is exceptionally creative, well-structured, and error-free.' },
        { name: 'Meets Expectations', points: 4, description: 'The writing is creative and generally well-structured with minor errors.' },
        { name: 'Approaching Expectations', points: 3, description: 'The writing shows some creativity but lacks structure or has noticeable errors.' },
        { name: 'Below Expectations', points: 2, description: 'The writing lacks creativity, structure, and has significant errors.' },
        { name: 'Unsatisfactory', points: 1, description: 'The writing does not meet any of the basic requirements.' }
      ]
    },
  ]);

  openCreateDrawer() {
    this.selectedType.set('analytic');
    this.rubricDrawerVisible.set(true);
  }

  createRubric() {
    this.rubricDrawerVisible.set(false);
  }

  editRubric(rubric: any) {
    this.editingRubric.set(rubric);
    this.activeDialogRef = this.dialogService.create({
      zContent: this.editModalTemplate(),
      zHideHeader: true,
      zHideFooter: true,
      zMaskClosable: false,
      zCustomClasses: '!p-0 overflow-hidden !min-w-4xl'
    });
  }

  closeEditModal() {
    if (this.activeDialogRef) {
      this.activeDialogRef.close();
      this.activeDialogRef = null;
    }
  }

  onTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedType.set(select.value);
  }
}