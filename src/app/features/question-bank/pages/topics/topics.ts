import { Component, signal, computed, inject, viewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardComboboxImports } from '@/shared/components/combobox';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';

interface Subtopic {
  id: string;
  name: string;
  totalItems: number;
}

interface Topic {
  id: string;
  name: string;
  totalItems: number;
  subtopics: Subtopic[];
}

interface Course {
  id: string;
  name: string;
}

@Component({
  imports: [CommonModule, ZardComboboxImports, ZardDropdownImports, ZardDialogImports],
  selector: 'app-topics',
  styleUrl: './topics.css',
  templateUrl: './topics.html',
})
export default class Topics {
  private readonly dialogService = inject(ZardDialogService);
  activeDialogRef: ZardDialogRef<any> | null = null;
  
  addTopicModalTemplate = viewChild.required<TemplateRef<any>>('addTopicModalTemplate');
  renameModalTemplate = viewChild.required<TemplateRef<any>>('renameModalTemplate');
  deleteModalTemplate = viewChild.required<TemplateRef<any>>('deleteModalTemplate');

  activeItemName = signal<string>('');

  courses = signal<Course[]>([
    { id: 'c1', name: 'Introduction to Biology' },
    { id: 'c2', name: 'Advanced Mathematics' },
    { id: 'c3', name: 'World History' }
  ]);

  selectedCourseId = signal<string>('c1');

  allTopics = signal<Record<string, Topic[]>>({
    'c1': [
      { id: 't1', name: 'Cellular Respiration', totalItems: 45, subtopics: [{ id: 's1', name: 'Glycolysis', totalItems: 20 }, { id: 's2', name: 'Krebs Cycle', totalItems: 25 }] },
      { id: 't2', name: 'Genetics', totalItems: 12, subtopics: [{ id: 's3', name: 'Mendelian Inheritance', totalItems: 12 }] }
    ],
    'c2': [
      { id: 't3', name: 'Calculus', totalItems: 8, subtopics: [{ id: 's4', name: 'Derivatives', totalItems: 5 }, { id: 's5', name: 'Integrals', totalItems: 3 }] }
    ],
    'c3': []
  });

  courseOptions = computed(() => this.courses().map(c => ({ value: c.id, label: c.name })));

  currentTopics = computed(() => {
    return this.allTopics()[this.selectedCourseId()] || [];
  });

  expandedTopics = signal<Set<string>>(new Set(['t1']));

  onCourseChange(value: string | string[] | null) {
    const val = Array.isArray(value) ? value[0] : (value || '');
    this.selectedCourseId.set(val);
    this.expandedTopics.set(new Set());
  }

  toggleTopic(topicId: string) {
    const current = new Set(this.expandedTopics());
    if (current.has(topicId)) {
      current.delete(topicId);
    } else {
      current.add(topicId);
    }
    this.expandedTopics.set(current);
  }

  isExpanded(topicId: string): boolean {
    return this.expandedTopics().has(topicId);
  }

  viewQuestions(id: string) {
    console.log('Navigate to view questions for:', id);
  }

  addTopic() {
    this.activeDialogRef = this.dialogService.create({
      zTitle: 'Add Topic',
      zContent: this.addTopicModalTemplate(),
      zHideFooter: true,
      zWidth: '450px'
    });
  }

  addSubtopic(topicId: string) {
    this.activeDialogRef = this.dialogService.create({
      zTitle: 'Add Subtopic',
      zContent: this.addTopicModalTemplate(),
      zHideFooter: true,
      zWidth: '450px'
    });
  }

  renameItem(id: string, name: string) {
    this.activeItemName.set(name);
    this.activeDialogRef = this.dialogService.create({
      zTitle: 'Rename',
      zContent: this.renameModalTemplate(),
      zHideFooter: true,
      zWidth: '450px'
    });
  }

  deleteItem(id: string, name: string) {
    this.activeItemName.set(name);
    this.activeDialogRef = this.dialogService.create({
      zTitle: 'Delete',
      zContent: this.deleteModalTemplate(),
      zHideFooter: true,
      zWidth: '450px'
    });
  }

  closeModal() {
    if (this.activeDialogRef) {
      this.activeDialogRef.close();
      this.activeDialogRef = null;
    }
  }
}
