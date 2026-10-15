import { Component, signal, computed } from '@angular/core';
import { ObjectListComponent, LearningObject } from '../../components/object-list/object-list';
import { ObjectGridComponent } from '../../components/object-grid/object-grid';
import { ObjectDetailComponent } from '../../components/object-detail/object-detail';
import { UseInCourseModalComponent } from '../../components/use-in-course-modal/use-in-course-modal';
import { UploadResourceModalComponent } from '../../components/upload-resource-modal/upload-resource-modal';
import { viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZardComboboxImports } from '@/shared/components/combobox';
import { ZardDropdownImports } from '@/shared/components/dropdown';

interface ContentSource {
  id: string;
  label: string;
}

@Component({
  selector: 'app-library',
  imports: [ObjectListComponent, ObjectGridComponent, ObjectDetailComponent, UseInCourseModalComponent, UploadResourceModalComponent, FormsModule, ZardComboboxImports, ZardDropdownImports],
  templateUrl: './library.html',
})
export class LibraryComponent {
  sources = signal<ContentSource[]>([
    { id: 'my-content', label: 'My Content' },
    { id: 'shared', label: 'Shared with Me' },
    { id: 'institution', label: 'Institution Content' },
    { id: 'templates', label: 'Templates' },
    { id: 'archived', label: 'Archived' }
  ]);

  activeSource = signal<string>('my-content');
  viewMode = signal<'grid' | 'list'>('grid');

  // Filter Options
  typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'video', label: 'Video' },
    { value: 'pdf', label: 'PDF/File' },
    { value: 'lesson', label: 'Lesson' },
    { value: 'quiz', label: 'Quiz' }
  ];

  subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'biology', label: 'Biology' },
    { value: 'physics', label: 'Physics' }
  ];

  levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: '100', label: '100 Level' },
    { value: '200', label: '200 Level' }
  ];

  licenceOptions = [
    { value: 'all', label: 'All Licences' },
    { value: 'own_work', label: 'Own Work' },
    { value: 'cc_by', label: 'CC BY' }
  ];

  objects = signal<LearningObject[]>([
    { id: '1', title: 'Cell Structure and Function', type: 'video', owner: 'Sarah Johnson', lastUsed: '2 days ago' },
    { id: '2', title: 'Introduction to Genetics', type: 'lesson', owner: 'Sarah Johnson', lastUsed: '1 week ago' },
    { id: '3', title: 'Lab Safety Guidelines', type: 'pdf', owner: 'Science Dept', lastUsed: '1 month ago' },
    { id: '4', title: 'Midterm Review Quiz', type: 'quiz', owner: 'Sarah Johnson', lastUsed: 'Yesterday' },
    { id: '5', title: 'Photosynthesis Deep Dive', type: 'video', owner: 'David Smith', lastUsed: '3 days ago' },
    { id: '6', title: 'Human Anatomy Overview', type: 'lesson', owner: 'Sarah Johnson', lastUsed: '2 weeks ago' },
  ]);

  selectedObject = signal<LearningObject | null>(null);

  useInCourseModal = viewChild.required(UseInCourseModalComponent);
  uploadModal = viewChild.required(UploadResourceModalComponent);

  selectedIds = signal<Set<string>>(new Set());

  allSelected = computed(() => this.selectedIds().size === this.objects().length && this.objects().length > 0);

  onToggleSelection(id: string) {
    this.selectedIds.update(set => {
      const newSet = new Set(set);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  }

  onToggleAll() {
    if (this.allSelected()) {
      this.selectedIds.set(new Set());
    } else {
      this.selectedIds.set(new Set(this.objects().map(o => o.id)));
    }
  }

  clearSelection() {
    this.selectedIds.set(new Set());
  }

  onObjectSelected(obj: LearningObject) {
    this.selectedObject.set(obj);
  }

  onUseInCourse(obj: LearningObject) {
    this.useInCourseModal().open();
  }
}
