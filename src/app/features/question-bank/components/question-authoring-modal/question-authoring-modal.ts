import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardComboboxImports } from '@/shared/components/combobox';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { ZardSwitchComponent } from '@/shared/components/switch';
import { QuestionTypePreview } from '../question-type-preview/question-type-preview';
import { AuthorManager } from '../author-manager/author-manager';

export interface QuestionType {
  code: string;
  name: string;
}

export interface QuestionCategory {
  id: string;
  name: string;
  questionTypes: QuestionType[];
}

@Component({
  selector: 'app-question-authoring-modal',
  imports: [CommonModule, ZardComboboxImports, ZardDropdownImports, ZardSwitchComponent, QuestionTypePreview, AuthorManager],
  templateUrl: './question-authoring-modal.html',
})
export class QuestionAuthoringModal {
  categories = signal<QuestionCategory[]>([
    {
      id: 'multiple-choice',
      name: 'Multiple Choice',
      questionTypes: [
        { code: 'MCQ', name: 'Single response' },
        { code: 'MRQ', name: 'Multiple responses' },
        { code: 'TRUE_FALSE', name: 'True or False' },
        { code: 'YES_NO', name: 'Yes or No' },
        { code: 'CHOICE_MATRIX', name: 'Choice Matrix' }
      ]
    },
    {
      id: 'fill-in-the-gap',
      name: 'Fill in the Gap',
      questionTypes: [
        { code: 'CLOZE_TEXT', name: 'Cloze with text' },
        { code: 'CLOZE_DROPDOWN', name: 'Cloze with dropdown' },
        { code: 'CLOZERADIO', name: 'Cloze with radio' },
        { code: 'CLOZE_TEXT_IMAGE', name: 'Label image with text' },
        { code: 'CLOZE_DROPDOWN_IMAGE', name: 'Label image with dropdown' },
        { code: 'IMAGE_DRAG_AND_DROP', name: 'Label image with drag and drop' }
      ]
    },
    {
      id: 'written',
      name: 'Written',
      questionTypes: [
        { code: 'ESSAY_PLAIN_TEXT', name: 'Essay with plain text' },
        { code: 'ESSAY_RICH_TEXT', name: 'Essay with rich text' },
        { code: 'SHORT_TEXT', name: 'Short text' }
      ]
    },
    {
      id: 'match-and-order',
      name: 'Match and Order',
      questionTypes: [
        { code: 'ORDER_LIST', name: 'Ordering' },
        { code: 'ASSOCIATION', name: 'Matching' }
      ]
    },
    {
      id: 'drawing-and-writing',
      name: 'Drawing and Writing',
      questionTypes: [
        { code: 'DRAWING_AND_WRITING', name: 'Drawing and writing' }
      ]
    }
  ]);
  
  categoryOptions = signal([
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'fill-in-the-gap', label: 'Fill in the Gap' },
    { value: 'written', label: 'Written' },
    { value: 'match-and-order', label: 'Match and Order' },
    { value: 'drawing-and-writing', label: 'Drawing and Writing' }
  ]);

  selectedCategory = signal<QuestionCategory | null>(this.categories()[0]);
  selectedQuestionType = signal<QuestionType | null>(this.categories()[0].questionTypes[0]);
  previewMode = signal(false);

  onCategoryChange(categoryId: string | string[] | null) {
    if (typeof categoryId !== 'string') return;
    const cat = this.categories().find(c => c.id === categoryId);
    if (cat) {
      this.selectedCategory.set(cat);
      this.selectedQuestionType.set(cat.questionTypes[0] ?? null);
    }
  }

  onQuestionTypeChange(qType: QuestionType) {
    this.selectedQuestionType.set(qType);
  }
}
