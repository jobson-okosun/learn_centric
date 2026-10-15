import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardDropdownImports } from '@/shared/components/dropdown/dropdown.imports';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  outcomes: string[];
  stepCount: number;
  isAdaptive: boolean;
  status: 'draft' | 'published';
}

@Component({
  imports: [RouterLink, ZardDropdownImports],
  selector: 'app-learning-paths-list',
  templateUrl: './list.html'
})
export default class LearningPathsListComponent {
  paths = signal<LearningPath[]>([
    {
      id: '1',
      title: 'Foundation of Biology',
      description: 'The core introductory sequence for first-year biology students.',
      outcomes: ['Cell Structure', 'Genetics', 'Metabolism'],
      stepCount: 4,
      isAdaptive: false,
      status: 'published'
    },
    {
      id: '2',
      title: 'Advanced Anatomy (Adaptive)',
      description: 'AI-driven path adapting to student mastery of complex anatomical structures.',
      outcomes: ['Skeletal System', 'Nervous System'],
      stepCount: 8,
      isAdaptive: true,
      status: 'draft'
    }
  ]);
}
