import { Component, input, output, signal } from '@angular/core';
import { LearningObject } from '../object-list/object-list';
import { ZardDrawerImports } from '@/shared/components/drawer';

@Component({
  selector: 'app-object-detail',
  imports: [ZardDrawerImports],
  templateUrl: './object-detail.html',
})
export class ObjectDetailComponent {
  object = input.required<LearningObject>();
  close = output<void>();
  visible = signal(true);

  onDrawerClose(isVisible: boolean) {
    if (!isVisible) {
      this.close.emit();
    }
  }
}
