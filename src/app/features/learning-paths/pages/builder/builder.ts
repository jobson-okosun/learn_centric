import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardSwitchComponent } from '@/shared/components/switch';

interface PathStep {
  id: string;
  type: 'course' | 'lesson';
  title: string;
  completionCriterion: 'complete_all' | 'score_threshold' | 'manual';
  masteryThreshold?: number;
}

@Component({
  imports: [RouterLink, ZardSwitchComponent],
  selector: 'app-learning-path-builder',
  templateUrl: './builder.html'
})
export default class LearningPathBuilderComponent {
  pathTitle = signal('Foundation of Biology');
  isEditingTitle = signal(false);
  isAdaptive = signal(false);
  entryCondition = signal('open');
  targetOutcomes = signal<string[]>(['Cell Structure', 'Genetics']);

  steps = signal<PathStep[]>([
    {
      id: 'step-1',
      type: 'course',
      title: 'Biology 101: Introduction',
      completionCriterion: 'complete_all'
    },
    {
      id: 'step-2',
      type: 'course',
      title: 'Genetics 101: The Basics',
      completionCriterion: 'score_threshold',
      masteryThreshold: 80
    }
  ]);

  removeOutcome(outcome: string) {
    this.targetOutcomes.update(outcomes => outcomes.filter(o => o !== outcome));
  }

  addOutcome(event: Event) {
    const input = event.target as HTMLInputElement;
    const val = input.value.trim();
    if (val) {
      this.targetOutcomes.update(outcomes => [...outcomes, val]);
      input.value = '';
    }
  }

  removeStep(id: string) {
    this.steps.update(steps => steps.filter(s => s.id !== id));
  }

  addStep() {
    this.steps.update(steps => [
      ...steps,
      {
        id: `step-${Date.now()}`,
        type: 'course',
        title: 'New Course/Lesson',
        completionCriterion: 'complete_all'
      }
    ]);
  }
}
