import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardChartImports, type ZardChartConfig, type ZardChartOptionOverride } from '@/shared/components/chart';
import { ZardDropdownImports } from '@/shared/components/dropdown';

interface Student {
  id: string;
  name: string;
  avatar: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  attendanceStreak: number;
  lastActive: string;
  averageScore: number;
  strengths: { subject: string; score: number }[];
}

@Component({
  imports: [CommonModule, FormsModule, ZardChartImports, ZardDropdownImports],
  selector: 'app-students',
  styleUrl: './students.css',
  templateUrl: './students.html',
})
export default class Students {
  searchQuery = signal('');
  
  students = signal<Student[]>([
    {
      id: '1',
      name: 'Emma Thompson',
      avatar: 'ET',
      riskLevel: 'Low',
      attendanceStreak: 14,
      lastActive: 'Today, 10:30 AM',
      averageScore: 92,
      strengths: [
        { subject: 'Genetics', score: 92 },
        { subject: 'Cell Bio', score: 88 },
        { subject: 'Ecology', score: 75 },
        { subject: 'Evolution', score: 85 },
        { subject: 'Anatomy', score: 90 },
      ]
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'MC',
      riskLevel: 'Medium',
      attendanceStreak: 3,
      lastActive: 'Yesterday, 2:15 PM',
      averageScore: 71,
      strengths: [
        { subject: 'Genetics', score: 65 },
        { subject: 'Cell Bio', score: 70 },
        { subject: 'Ecology', score: 88 },
        { subject: 'Evolution', score: 72 },
        { subject: 'Anatomy', score: 60 },
      ]
    },
    {
      id: '3',
      name: 'Sophia Patel',
      avatar: 'SP',
      riskLevel: 'High',
      attendanceStreak: 0,
      lastActive: '3 days ago',
      averageScore: 50,
      strengths: [
        { subject: 'Genetics', score: 45 },
        { subject: 'Cell Bio', score: 55 },
        { subject: 'Ecology', score: 60 },
        { subject: 'Evolution', score: 50 },
        { subject: 'Anatomy', score: 40 },
      ]
    },
    {
      id: '4',
      name: 'James Wilson',
      avatar: 'JW',
      riskLevel: 'Low',
      attendanceStreak: 21,
      lastActive: 'Today, 9:00 AM',
      averageScore: 88,
      strengths: [
        { subject: 'Genetics', score: 85 },
        { subject: 'Cell Bio', score: 95 },
        { subject: 'Ecology', score: 92 },
        { subject: 'Evolution', score: 88 },
        { subject: 'Anatomy', score: 82 },
      ]
    },
    {
      id: '4',
      name: 'James Wilson',
      avatar: 'JW',
      riskLevel: 'Low',
      attendanceStreak: 21,
      lastActive: 'Today, 9:00 AM',
      averageScore: 88,
      strengths: [
        { subject: 'Genetics', score: 85 },
        { subject: 'Cell Bio', score: 95 },
        { subject: 'Ecology', score: 92 },
        { subject: 'Evolution', score: 88 },
        { subject: 'Anatomy', score: 82 },
      ]
    },
    {
      id: '4',
      name: 'James Wilson',
      avatar: 'JW',
      riskLevel: 'Low',
      attendanceStreak: 21,
      lastActive: 'Today, 9:00 AM',
      averageScore: 88,
      strengths: [
        { subject: 'Genetics', score: 85 },
        { subject: 'Cell Bio', score: 95 },
        { subject: 'Ecology', score: 92 },
        { subject: 'Evolution', score: 88 },
        { subject: 'Anatomy', score: 82 },
      ]
    },
    {
      id: '4',
      name: 'James Wilson',
      avatar: 'JW',
      riskLevel: 'Low',
      attendanceStreak: 21,
      lastActive: 'Today, 9:00 AM',
      averageScore: 88,
      strengths: [
        { subject: 'Genetics', score: 85 },
        { subject: 'Cell Bio', score: 95 },
        { subject: 'Ecology', score: 92 },
        { subject: 'Evolution', score: 88 },
        { subject: 'Anatomy', score: 82 },
      ]
    },
    {
      id: '4',
      name: 'James Wilson',
      avatar: 'JW',
      riskLevel: 'Low',
      attendanceStreak: 21,
      lastActive: 'Today, 9:00 AM',
      averageScore: 88,
      strengths: [
        { subject: 'Genetics', score: 85 },
        { subject: 'Cell Bio', score: 95 },
        { subject: 'Ecology', score: 92 },
        { subject: 'Evolution', score: 88 },
        { subject: 'Anatomy', score: 82 },
      ]
    },
    {
      id: '4',
      name: 'James Wilson',
      avatar: 'JW',
      riskLevel: 'Low',
      attendanceStreak: 21,
      lastActive: 'Today, 9:00 AM',
      averageScore: 88,
      strengths: [
        { subject: 'Genetics', score: 85 },
        { subject: 'Cell Bio', score: 95 },
        { subject: 'Ecology', score: 92 },
        { subject: 'Evolution', score: 88 },
        { subject: 'Anatomy', score: 82 },
      ]
    },
    {
      id: '4',
      name: 'James Wilson',
      avatar: 'JW',
      riskLevel: 'Low',
      attendanceStreak: 21,
      lastActive: 'Today, 9:00 AM',
      averageScore: 88,
      strengths: [
        { subject: 'Genetics', score: 85 },
        { subject: 'Cell Bio', score: 95 },
        { subject: 'Ecology', score: 92 },
        { subject: 'Evolution', score: 88 },
        { subject: 'Anatomy', score: 82 },
      ]
    },
  ]);

  filteredStudents = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.students().filter(s => s.name.toLowerCase().includes(query));
  });

  selectedStudent = signal<Student>(this.students()[0]);

  selectStudent(student: Student) {
    this.selectedStudent.set(student);
  }

  chartConfig = signal<ZardChartConfig>({
    score: {
      label: 'Proficiency Score',
      color: 'var(--primary)',
    }
  });

  chartOption = signal<ZardChartOptionOverride>({
    radar: {
      indicator: [
        { name: 'Genetics', max: 100 },
        { name: 'Cell Bio', max: 100 },
        { name: 'Ecology', max: 100 },
        { name: 'Evolution', max: 100 },
        { name: 'Anatomy', max: 100 }
      ],
      shape: 'polygon',
      splitArea: {
        areaStyle: {
          color: ['transparent']
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#d1d5db' // gray-300
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#d1d5db' // gray-300
        }
      },
      axisName: {
        color: '#4b5563', // gray-600
        fontWeight: 500,
      }
    },
    series: [
      {
        type: 'radar',
        itemStyle: { color: 'var(--primary)' },
        areaStyle: { opacity: 0.2 },
        symbolSize: 6,
      }
    ]
  });
}
