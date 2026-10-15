import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardChartImports, type ZardChartConfig, type ZardChartOptionOverride } from '@/shared/components/chart';
import { ZardDropdownImports } from '@/shared/components/dropdown';

interface QuestionAnalysis {
  id: string;
  number: number;
  text: string;
  type: string;
  correctRate: number;
  avgTimeSeconds: number;
  skipRate: number;
  flag: 'Too Hard' | 'Confusing' | 'Time Consuming' | null;
}

@Component({
  imports: [CommonModule, FormsModule, ZardChartImports, ZardDropdownImports],
  selector: 'app-assessments',
  templateUrl: './assessments.html',
})
export default class Assessments {
  selectedAssessment = signal('Midterm Exam');

  assessmentsList = signal([
    'Quiz 1: Cell Biology',
    'Midterm Exam',
    'Lab Report 3',
    'Final Exam Prep'
  ]);

  // Overall metrics
  averageScore = signal(76);
  submissionRate = signal(95);
  averageTimeMinutes = signal(42);

  // Histogram data
  distributionData = signal([
    { range: '0-59', students: 3 },
    { range: '60-69', students: 6 },
    { range: '70-79', students: 15 },
    { range: '80-89', students: 12 },
    { range: '90-100', students: 4 },
  ]);

  chartConfig = signal<ZardChartConfig>({
    students: { color: 'var(--primary)', label: 'Students' }
  });

  chartOption = signal<ZardChartOptionOverride>({
    grid: {
      left: 10,
      right: 10,
      bottom: 24,
      top: 24,
      containLabel: true,
    },
    xAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        margin: 16,
        color: '#6b7280',
      },
    },
    yAxis: {
      splitNumber: 4,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        margin: 16,
        color: '#9ca3af',
      },
    },
    series: [
      {
        itemStyle: { borderRadius: [8, 8, 0, 0] },
        barWidth: '40%',
      }
    ]
  });

  // Item analysis
  questions = signal<QuestionAnalysis[]>([
    {
      id: 'q1',
      number: 1,
      text: 'Which of the following best describes the role of ATP in cellular metabolism?',
      type: 'Cell theory',
      correctRate: 92,
      avgTimeSeconds: 45,
      skipRate: 0,
      flag: null
    },
    {
      id: 'q2',
      number: 2,
      text: 'Calculate the probability of offspring inheriting a recessive trait when both parents are heterozygous.',
      type: 'Problem Solving',
      correctRate: 34,
      avgTimeSeconds: 150,
      skipRate: 8,
      flag: 'Too Hard'
    },
    {
      id: 'q3',
      number: 3,
      text: 'Identify the structures labeled A through D in the diagram of the chloroplast.',
      type: 'Image Annotation',
      correctRate: 78,
      avgTimeSeconds: 65,
      skipRate: 2,
      flag: null
    },
    {
      id: 'q4',
      number: 4,
      text: 'Explain the difference between mitosis and meiosis in terms of genetic variation.',
      type: 'Short Answer',
      correctRate: 65,
      avgTimeSeconds: 240,
      skipRate: 5,
      flag: 'Time Consuming'
    },
    {
      id: 'q5',
      number: 5,
      text: 'Which statement is NOT untrue regarding the lack of absence of mitochondria in mature red blood cells?',
      type: 'Multiple Choice',
      correctRate: 42,
      avgTimeSeconds: 85,
      skipRate: 15,
      flag: 'Confusing'
    },
    {
      id: 'q6',
      number: 6,
      text: 'Match the following enzymes with their function in DNA replication.',
      type: 'Matching',
      correctRate: 85,
      avgTimeSeconds: 50,
      skipRate: 1,
      flag: null
    }
  ]);

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  }
}
