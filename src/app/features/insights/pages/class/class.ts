import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { ZardChartImports, type ZardChartConfig, type ZardChartOptionOverride } from '@/shared/components/chart';

interface Metric {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

interface ActivityInsight {
  id: string;
  name: string;
  type: string;
  completionRate: number;
  averageScore: number;
  date: string;
}

@Component({
  imports: [CommonModule, ZardDropdownImports, ZardChartImports],
  selector: 'app-class',
  styleUrl: './class.css',
  templateUrl: './class.html',
})
export default class Class {
  metrics = signal<Metric[]>([
    { label: 'Average Attendance', value: '92%', trend: '+2.4%', trendUp: true },
    { label: 'Assignment Completion', value: '88%', trend: '-1.2%', trendUp: false },
    { label: 'Class Average Grade', value: 'B+', trend: 'Steady', trendUp: true }
  ]);

  chartData = signal([
    { week: 'Wk 1', previous: 72, current: null },
    { week: 'Wk 2', previous: 68, current: null },
    { week: 'Wk 3', performance: 76, previous: 76, current: null },
    { week: 'Wk 4', previous: 82, current: null },
    { week: 'Wk 5', previous: 79, current: null },
    { week: 'This Wk', previous: null, current: 88 },
  ]);

  chartConfig = signal<ZardChartConfig>({
    previous: {
      label: 'Previous Weeks',
      color: '#e5e7eb', // soft gray-200
    },
    current: {
      label: 'This Week',
      color: 'var(--primary)',
    },
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
        formatter: (value: string | number) => {
          return String(value) === 'This Wk' ? `{bold|${value}}` : String(value);
        },
        rich: {
          bold: {
            fontWeight: 'bold',
            color: '#111827',
          },
        },
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
      },
      {
        itemStyle: { borderRadius: [8, 8, 0, 0] },
        barWidth: '40%',
      },
    ],
  });

  activities = signal<ActivityInsight[]>([
    { id: '1', name: 'Cell Structure Quiz', type: 'Quiz', completionRate: 98, averageScore: 82, date: 'Oct 12' },
    { id: '2', name: 'Mitochondria Worksheet', type: 'Assignment', completionRate: 85, averageScore: 76, date: 'Oct 10' },
    { id: '3', name: 'Genetics Reading', type: 'Reading', completionRate: 72, averageScore: 0, date: 'Oct 08' },
    { id: '4', name: 'Midterm Exam', type: 'Exam', completionRate: 100, averageScore: 68, date: 'Oct 05' },
  ]);
}
