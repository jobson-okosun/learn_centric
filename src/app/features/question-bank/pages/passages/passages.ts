import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardComboboxImports } from '@/shared/components/combobox';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { McqPreview } from '../../item-types/mcq-preview/mcq-preview';
import { ZardDialogService } from '@/shared/components/dialog';
import { QuestionAuthoringModal } from '../../components/question-authoring-modal/question-authoring-modal';

export interface Passage {
  id: string;
  title: string;
  content: string;
  questions: any[];
}

@Component({
  selector: 'app-passages',
  imports: [CommonModule, ZardComboboxImports, ZardDropdownImports, McqPreview],
  templateUrl: './passages.html',
})
export default class Passages {
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

  expandedPassages = signal<Record<string, boolean>>({});

  passages = signal<Passage[]>([
    {
      id: 'p1',
      title: 'Cell Biology',
      content: 'The cell is the basic structural, functional, and biological unit of all known organisms. A cell is the smallest unit of life. Cells are often called the "building blocks of life". The study of cells is called cell biology, cellular biology, or cytology. Cells consist of cytoplasm enclosed within a membrane, which contains many biomolecules such as proteins and nucleic acids.',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          stem: 'What is often called the "building block of life"?',
          options: [
            { id: 'opt1', text: 'Cell' },
            { id: 'opt2', text: 'Atom' },
            { id: 'opt3', text: 'Molecule' },
            { id: 'opt4', text: 'Tissue' }
          ] 
        },
        {
          id: 'q2',
          type: 'mcq',
          stem: 'What is the study of cells called?',
          options: [
            { id: 'opt1', text: 'Cell biology' },
            { id: 'opt2', text: 'Histology' },
            { id: 'opt3', text: 'Anatomy' },
            { id: 'opt4', text: 'Genetics' }
          ]
        }
      ]
    },
    {
      id: 'p2',
      title: 'Newton\'s Laws',
      content: 'Isaac Newton formulated three laws of motion that describe the relationship between a body and the forces acting upon it, and its motion in response to those forces. More precisely, the first law defines the force qualitatively, the second law offers a quantitative measure of the force, and the third asserts that a single isolated force doesn\'t exist.',
      questions: [
        {
          id: 'q3',
          type: 'mcq',
          stem: 'Who formulated the three laws of motion?',
          options: [
            { id: 'opt1', text: 'Isaac Newton' },
            { id: 'opt2', text: 'Albert Einstein' },
            { id: 'opt3', text: 'Galileo Galilei' },
            { id: 'opt4', text: 'Johannes Kepler' }
          ]
        }
      ]
    }
  ]);

  togglePassage(id: string) {
    this.expandedPassages.update(state => ({
      ...state,
      [id]: !state[id]
    }));
  }

  isExpanded(id: string) {
    return this.expandedPassages()[id] || false;
  }

  addPassage() {
    // Empty for now
  }
}
