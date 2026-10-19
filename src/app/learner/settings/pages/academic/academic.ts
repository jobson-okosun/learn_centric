import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface EnrolledAcademicClass {
  code: string;
  title: string;
  cohort: string;
  credits: number;
  instructor: string;
  status: 'In Progress' | 'Completed';
}

@Component({
  imports: [RouterLink],
  templateUrl: './academic.html',
  styleUrl: './academic.css',
})
export default class Academic {
  readonly studentUid = signal('STU-2024-8841');
  readonly program = signal('Bachelor of Science in Computer Science & Applied Mathematics');
  readonly college = signal('College of Computing & Physical Sciences');
  readonly concentration = signal('Systems & Theoretical Computation');
  readonly standing = signal("Good Standing · Top 5% Distinction");
  readonly gpa = signal('3.84');
  readonly earnedCredits = signal(76);
  readonly totalCredits = signal(120);
  readonly catalogYear = signal('2024–2025');
  readonly graduationExpected = signal('Spring 2027');

  readonly advisor = signal({
    name: 'Dr. Evelyn Reed',
    role: 'Associate Professor & Academic Advisor',
    department: 'Mathematics & Computer Science',
    email: 'evelyn.reed@university.edu',
    office: 'Turing Hall, Room 412',
    hours: 'Mon & Wed, 2:00 PM – 4:00 PM EST',
  });

  readonly currentCohorts = signal<EnrolledAcademicClass[]>([
    {
      code: 'MATH-301-A',
      title: 'Multivariable Calculus',
      cohort: 'Fall 2026 · Section A',
      credits: 4,
      instructor: 'Dr. Evelyn Reed',
      status: 'In Progress',
    },
    {
      code: 'PHYS-201-B',
      title: 'General Physics & Electromagnetism',
      cohort: 'Fall 2026 · Section B',
      credits: 4,
      instructor: 'Prof. Jonathan Hayes',
      status: 'In Progress',
    },
    {
      code: 'CS-210-C',
      title: 'Data Structures & Algorithms',
      cohort: 'Fall 2026 · Section C',
      credits: 4,
      instructor: 'Dr. Alan Vance',
      status: 'In Progress',
    },
    {
      code: 'BIO-204-A',
      title: 'Cellular & Molecular Biology',
      cohort: 'Fall 2026 · Section A',
      credits: 4,
      instructor: 'Dr. Sarah Jenkins',
      status: 'In Progress',
    },
  ]);

  readonly isCopied = signal(false);

  copyUid(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.studentUid());
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    }
  }
}
