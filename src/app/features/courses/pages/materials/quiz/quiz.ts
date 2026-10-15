import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  text: string;
  points: number;
  options: QuizOption[];
}

export interface QuizSettings {
  timeLimitMinutes: number;
  passingScore: number;
  shuffleQuestions: boolean;
  showResultsImmediately: boolean;
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  settings: QuizSettings;
  questions: QuizQuestion[];
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-quiz',
  styleUrl: './quiz.css',
  templateUrl: './quiz.html',
})
export default class Quiz {
  // Mock Quiz State
  quiz = signal<QuizData>({
    id: 'q1',
    title: 'Midterm Examination',
    description: 'This exam covers chapters 1 through 5. You have 60 minutes to complete it.',
    settings: {
      timeLimitMinutes: 60,
      passingScore: 70,
      shuffleQuestions: true,
      showResultsImmediately: false,
    },
    questions: [
      {
        id: '1',
        text: 'Which of the following is a key feature of Angular?',
        points: 5,
        options: [
          { id: '1a', text: 'Two-way data binding', isCorrect: true },
          { id: '1b', text: 'Virtual DOM', isCorrect: false },
          { id: '1c', text: 'Server-side rendering only', isCorrect: false },
          { id: '1d', text: 'No TypeScript support', isCorrect: false },
        ]
      },
      {
        id: '2',
        text: 'What is the purpose of RxJS in Angular?',
        points: 5,
        options: [
          { id: '2a', text: 'To handle styling', isCorrect: false },
          { id: '2b', text: 'To manage routing', isCorrect: false },
          { id: '2c', text: 'To handle asynchronous operations', isCorrect: true },
          { id: '2d', text: 'To compile templates', isCorrect: false },
        ]
      },
      {
        id: '3',
        text: 'Which decorator is used to define a component in Angular?',
        points: 10,
        options: [
          { id: '3a', text: '@Module', isCorrect: false },
          { id: '3b', text: '@Injectable', isCorrect: false },
          { id: '3c', text: '@Component', isCorrect: true },
          { id: '3d', text: '@Directive', isCorrect: false },
        ]
      }
    ]
  });

  // Preview State
  currentPreviewIndex = signal<number>(0);
  
  currentPreviewQuestion = computed(() => {
    const q = this.quiz();
    return q.questions[this.currentPreviewIndex()] || null;
  });

  nextPreviewQuestion() {
    if (this.currentPreviewIndex() < this.quiz().questions.length - 1) {
      this.currentPreviewIndex.update(i => i + 1);
    }
  }

  prevPreviewQuestion() {
    if (this.currentPreviewIndex() > 0) {
      this.currentPreviewIndex.update(i => i - 1);
    }
  }
}
