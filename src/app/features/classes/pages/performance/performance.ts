import { ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports } from '@/shared/components/drawer';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface StudentPerformance {
  id: string;
  name: string;
  email: string;
  avatar: string;
  currentGrade: {
    percentage: number;
    letter: string;
  };
  progress: number;
  mastery: number; 
  status: 'on-track' | 'at-risk' | 'falling-behind';
}

@Component({
  imports: [RouterLink, ZardDropdownImports, ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports],
  selector: 'app-performance',
  styleUrl: './performance.css',
  templateUrl: './performance.html',
})
export default class Performance {
  profileDrawerVisible = signal(false);

  students = signal<StudentPerformance[]>([
    {
      id: '1',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=0D8ABC&color=fff',
      currentGrade: { percentage: 92, letter: 'A' },
      progress: 85,
      mastery: 88,
      status: 'on-track'
    },
    {
      id: '2',
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=E11D48&color=fff',
      currentGrade: { percentage: 68, letter: 'D+' },
      progress: 45,
      mastery: 52,
      status: 'at-risk'
    },
    {
      id: '3',
      name: 'Sam Smith',
      email: 'sam.smith@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Sam+Smith&background=10B981&color=fff',
      currentGrade: { percentage: 88, letter: 'B+' },
      progress: 75,
      mastery: 82,
      status: 'on-track'
    },
    {
      id: '4',
      name: 'Maria Garcia',
      email: 'm.garcia@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=F59E0B&color=fff',
      currentGrade: { percentage: 74, letter: 'C' },
      progress: 60,
      mastery: 65,
      status: 'falling-behind'
    },
    {
      id: '5',
      name: 'David Chen',
      email: 'd.chen@example.com',
      avatar: 'https://ui-avatars.com/api/?name=David+Chen&background=8B5CF6&color=fff',
      currentGrade: { percentage: 95, letter: 'A+' },
      progress: 90,
      mastery: 92,
      status: 'on-track'
    }
  ]);
}
