import { Component, input, output } from '@angular/core';
import { ZardDropdownImports } from '@/shared/components/dropdown';

export interface LearningObject {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'lesson' | 'quiz';
  owner: string;
  lastUsed: string;
}

@Component({
  selector: 'app-object-list',
  imports: [ZardDropdownImports],
  templateUrl: './object-list.html',
})
export class ObjectListComponent {
  objects = input.required<LearningObject[]>();
  selectedIds = input.required<Set<string>>();
  allSelected = input<boolean>(false);
  objectSelected = output<LearningObject>();
  useInCourse = output<LearningObject>();
  toggleSelection = output<string>();
  toggleAll = output<void>();
}
