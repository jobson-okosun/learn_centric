import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZardComboboxComponent } from '@/shared/components/combobox';

@Component({
  imports: [ZardComboboxComponent, FormsModule],
  selector: 'app-overview',
  styles: ``,
  templateUrl: './overview.html',
})
export default class Overview {
  selectedCourseId = signal('bio201-a');
  selectedAssignees = signal<string[]>([]);

  courseOptions = signal<{label: string, value: string}[]>([
    { label: 'Biology 201 - Section A', value: 'bio201-a' },
    { label: 'Physics 102 - Fall Cohort', value: 'phy102' },
    { label: 'Computer Science 101', value: 'cs101' },
  ]);

  assigneeOptions = signal<{label: string, value: string}[]>([
    { label: 'All Students', value: 'all' },
    { label: 'Group: Study Group 1', value: 'g-1' },
    { label: 'Group: Study Group 2', value: 'g-2' },
  ]);
}
