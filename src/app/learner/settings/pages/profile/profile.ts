import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export default class Profile {
  readonly firstName = signal('Alex');
  readonly lastName = signal('Chen');
  readonly preferredName = signal('Alex');
  readonly pronouns = signal('he/him');
  readonly email = signal('alex.chen@university.edu');
  readonly phone = signal('+1 (555) 382-9014');
  readonly timezone = signal('America/New_York (EST)');
  readonly locale = signal('en-US');
  readonly bio = signal('Undergraduate Junior majoring in Computer Science and Applied Mathematics. Interested in algorithm analysis, multivariable systems, and machine learning architectures.');
  readonly graduationYear = signal('2027');

  readonly saveSuccess = signal(false);

  saveProfile(): void {
    this.saveSuccess.set(true);
    setTimeout(() => {
      this.saveSuccess.set(false);
    }, 3500);
  }
}
