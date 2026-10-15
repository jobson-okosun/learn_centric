import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardComboboxImports } from '@/shared/components/combobox';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { McqPreview, Question } from '../../item-types/mcq-preview/mcq-preview';
import { ZardDialogService } from '@/shared/components/dialog';
import { QuestionAuthoringModal } from '../../components/question-authoring-modal/question-authoring-modal';

@Component({
  imports: [CommonModule, ZardComboboxImports, ZardDropdownImports, McqPreview],
  selector: 'app-questions',
  templateUrl: './questions.html',
})
export default class Questions {
  private dialog = inject(ZardDialogService);

  openAuthoringModal() {
    this.dialog.create({
      zContent: QuestionAuthoringModal,
      zHideHeader: true,
      zHideFooter: true,
      zMaskClosable: false,
      zCustomClasses: 'h-[95vh] min-w-[calc(100vw-4rem)] !p-0 overflow-hidden rounded-2xl flex flex-col bg-white'
    });
  }

  questionTypes = signal([
    { value: 'all', label: 'All Types' },
    { value: 'single', label: 'Single Choice' }
  ]);

  courses = signal([
    { value: 'all', label: 'All Courses' },
    { value: '1', label: 'Mathematics' },
    { value: '2', label: 'Physics' },
  ]);
  
  topics = signal([
    { value: 'all', label: 'All Topics' },
    { value: '1', label: 'Algebra' },
    { value: '2', label: 'Geometry' },
  ]);

  subtopics = signal([
    { value: 'all', label: 'All Sub-Topics' },
    { value: '1', label: 'Linear Equations' },
    { value: '2', label: 'Quadratic Equations' },
  ]);

  questions = signal<Question[]>([
    { 
      id: 'q1', 
      type: 'Multiple Choice', 
      stem: 'What is the powerhouse of the cell?', 
      points: 1,
      options: [
        { id: 'opt1', text: 'Nucleus' },
        { id: 'opt2', text: 'Ribosome' },
        { id: 'opt3', text: 'Mitochondria' },
        { id: 'opt4', text: 'Endoplasmic Reticulum' }
      ]
    },
    { 
      id: 'q2', 
      type: 'Multiple Choice', 
      stem: 'Which planet is known as the Red Planet?', 
      points: 1,
      options: [
        { id: 'opt1', text: 'Earth' },
        { id: 'opt2', text: 'Mars' },
        { id: 'opt3', text: 'Jupiter' },
        { id: 'opt4', text: 'Venus' }
      ]
    }
  ]);
}
