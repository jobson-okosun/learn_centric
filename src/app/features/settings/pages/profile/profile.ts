import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export default class Profile {
  readonly academicTitle = signal('Professor');
  readonly firstName = signal('Marcus');
  readonly lastName = signal('Vance');
  readonly preferredName = signal('Prof. Vance');
  readonly pronouns = signal('he/him');
  readonly email = signal('m.vance@university.edu');
  readonly phone = signal('+1 (555) 234-8891');
  readonly department = signal('Department of Physics & Mathematical Engineering');
  readonly facultyId = signal('FAC-8842-TX');
  readonly officeLocation = signal('Hall B, Suite 402, North Academic Quad');
  readonly officeHours = signal('Tuesdays & Thursdays: 2:00 PM – 4:30 PM (EST)');
  readonly bio = signal('Full Professor specializing in Classical Mechanics, Quantum Oscillations, and Computational Physics. Committed to problem-based learning, interactive derivations, and mentorship.');
  readonly googleScholar = signal('https://scholar.google.com/citations?user=mvance_physics');
  readonly orcid = signal('0000-0002-1825-0097');
  readonly githubUrl = signal('https://github.com/prof-vance-lab');
  readonly website = signal('https://physics.university.edu/faculty/mvance');
  readonly timezone = signal('America/New_York (EST)');

  readonly saveSuccess = signal(false);
  readonly copiedId = signal(false);

  copyFacultyId(): void {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(this.facultyId());
    }
    this.copiedId.set(true);
    setTimeout(() => this.copiedId.set(false), 2000);
  }

  saveProfile(): void {
    this.saveSuccess.set(true);
    setTimeout(() => {
      this.saveSuccess.set(false);
    }, 3500);
  }
}
