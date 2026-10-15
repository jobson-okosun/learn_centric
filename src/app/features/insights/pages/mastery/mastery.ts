import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardDropdownImports } from '@/shared/components/dropdown';

export interface LearningOutcome {
  id: string;
  code: string;
  name: string;
}

export type MasteryLevel = 'exceeds' | 'meets' | 'near' | 'below' | 'unmarked';

export interface StudentMastery {
  id: string;
  name: string;
  avatar: string;
  outcomes: Record<string, { level: MasteryLevel, score: string }>;
}

@Component({
  imports: [CommonModule, FormsModule, ZardDropdownImports],
  selector: 'app-mastery',
  templateUrl: './mastery.html',
})
export default class Mastery {
  selectedUnit = signal('Unit 2: Genetics');

  units = signal([
    'Unit 1: Cell Biology',
    'Unit 2: Genetics',
    'Unit 3: Evolution',
    'Unit 4: Ecology'
  ]);

  outcomes = signal<LearningOutcome[]>([
    { id: 'lo1', code: 'GN.1.1', name: 'Mendelian Inheritance' },
    { id: 'lo2', code: 'GN.1.2', name: 'Punnett Squares' },
    { id: 'lo3', code: 'GN.2.1', name: 'DNA Structure' },
    { id: 'lo4', code: 'GN.2.2', name: 'Protein Synthesis' },
    { id: 'lo5', code: 'GN.3.1', name: 'Genetic Mutations' },
  ]);

  students = signal<StudentMastery[]>([
    {
      id: '1', name: 'Emma Thompson', avatar: 'ET',
      outcomes: {
        'lo1': { level: 'exceeds', score: '4.0' },
        'lo2': { level: 'exceeds', score: '3.8' },
        'lo3': { level: 'meets', score: '3.0' },
        'lo4': { level: 'exceeds', score: '3.5' },
        'lo5': { level: 'near', score: '2.0' },
      }
    },
    {
      id: '2', name: 'Michael Chen', avatar: 'MC',
      outcomes: {
        'lo1': { level: 'meets', score: '3.0' },
        'lo2': { level: 'meets', score: '3.0' },
        'lo3': { level: 'near', score: '2.5' },
        'lo4': { level: 'below', score: '1.0' },
        'lo5': { level: 'unmarked', score: '-' },
      }
    },
    {
      id: '3', name: 'Sophia Patel', avatar: 'SP',
      outcomes: {
        'lo1': { level: 'near', score: '2.0' },
        'lo2': { level: 'below', score: '1.5' },
        'lo3': { level: 'below', score: '1.0' },
        'lo4': { level: 'unmarked', score: '-' },
        'lo5': { level: 'unmarked', score: '-' },
      }
    },
    {
      id: '4', name: 'James Wilson', avatar: 'JW',
      outcomes: {
        'lo1': { level: 'exceeds', score: '3.8' },
        'lo2': { level: 'meets', score: '3.2' },
        'lo3': { level: 'meets', score: '3.0' },
        'lo4': { level: 'near', score: '2.5' },
        'lo5': { level: 'near', score: '2.0' },
      }
    },
    {
      id: '5', name: 'Olivia Davis', avatar: 'OD',
      outcomes: {
        'lo1': { level: 'exceeds', score: '4.0' },
        'lo2': { level: 'exceeds', score: '4.0' },
        'lo3': { level: 'exceeds', score: '3.8' },
        'lo4': { level: 'exceeds', score: '3.8' },
        'lo5': { level: 'meets', score: '3.0' },
      }
    }
  ]);
}
