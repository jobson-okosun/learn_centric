import { Component, input, output } from '@angular/core';
import { LearningObject } from '../object-list/object-list';
import { ZardDropdownImports } from '@/shared/components/dropdown';

@Component({
  selector: 'app-object-grid',
  imports: [ZardDropdownImports],
  templateUrl: './object-grid.html',
})
export class ObjectGridComponent {
  objects = input.required<LearningObject[]>();
  selectedIds = input.required<Set<string>>();
  objectSelected = output<LearningObject>();
  useInCourse = output<LearningObject>();
  toggleSelection = output<string>();
}
