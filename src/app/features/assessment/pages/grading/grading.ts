import { Component, signal, computed } from '@angular/core';

interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  levels: { name: string; points: number; description: string }[];
}

@Component({
  selector: 'app-grading',
  styleUrl: './grading.css',
  templateUrl: './grading.html',
})
export default class Grading {
  criteria = signal<RubricCriterion[]>([
    {
      id: 'c1',
      name: 'Knowledge',
      description: 'Understanding of topic',
      levels: [
        { name: 'Excellent', points: 25, description: 'Deep understanding' },
        { name: 'Good', points: 20, description: 'Solid grasp' },
        { name: 'Fair', points: 15, description: 'Basic understanding' },
        { name: 'Poor', points: 10, description: 'Lacks understanding' }
      ]
    },
    {
      id: 'c2',
      name: 'Reasoning',
      description: 'Logical flow & argument',
      levels: [
        { name: 'Excellent', points: 25, description: 'Highly logical' },
        { name: 'Good', points: 20, description: 'Mostly logical' },
        { name: 'Fair', points: 15, description: 'Some logic gaps' },
        { name: 'Poor', points: 10, description: 'Illogical' }
      ]
    },
    {
      id: 'c3',
      name: 'Accuracy',
      description: 'Factual correctness',
      levels: [
        { name: 'Excellent', points: 25, description: 'No factual errors' },
        { name: 'Good', points: 20, description: 'Minor errors' },
        { name: 'Fair', points: 15, description: 'Some factual errors' },
        { name: 'Poor', points: 10, description: 'Mostly incorrect' }
      ]
    },
    {
      id: 'c4',
      name: 'Presentation',
      description: 'Clarity & structure',
      levels: [
        { name: 'Excellent', points: 25, description: 'Very clear' },
        { name: 'Good', points: 20, description: 'Clear structure' },
        { name: 'Fair', points: 15, description: 'Somewhat clear' },
        { name: 'Poor', points: 10, description: 'Unclear' }
      ]
    }
  ]);

  selectedScores = signal<Record<string, number>>({
    'c1': 20,
    'c2': 25,
    'c3': 20, 
    'c4': 15  
  });

  totalScore = computed(() => {
    const scores = this.selectedScores();
    return Object.values(scores).reduce((sum, val) => sum + val, 0);
  });

  selectLevel(criterionId: string, points: number) {
    this.selectedScores.update(scores => ({
      ...scores,
      [criterionId]: points
    }));
  }
}
