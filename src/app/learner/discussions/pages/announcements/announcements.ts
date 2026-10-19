import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface LearnerAnnouncement {
  id: string;
  title: string;
  body: string;
  courseCode: string;
  courseName: string;
  instructorName: string;
  instructorRole: string;
  instructorInitials: string;
  date: string;
  channels: string[];
  isUrgent?: boolean;
  isRead?: boolean;
  attachments?: { name: string; size: string; type: string }[];
}

@Component({
  imports: [FormsModule],
  templateUrl: './announcements.html',
  styleUrl: './announcements.css',
})
export default class Announcements {
  readonly searchQuery = signal('');
  readonly selectedCourse = signal('all');
  readonly filterType = signal<'all' | 'unread' | 'urgent'>('all');
  readonly unreadOnly = signal(false);
  readonly selectedAnnouncement = signal<LearnerAnnouncement | null>(null);

  readonly announcements = signal<LearnerAnnouncement[]>([
    {
      id: 'ann-1',
      title: 'Midterm Exam Format Update & Room Assignment',
      body: 'Please be aware that the Multivariable Calculus midterm format has been updated to include 2 essay questions on vector field applications. The exam will take place in Science Hall Room 302 this Wednesday from 10:00 AM to 11:45 AM. Scrap paper will be provided at your desk. Make sure to arrive 15 minutes before the exam begins.',
      courseCode: 'MATH-301',
      courseName: 'Multivariable Calculus',
      instructorName: 'Prof. Jonathan Hayes',
      instructorRole: 'Head Lecturer',
      instructorInitials: 'JH',
      date: 'Today at 08:30 AM',
      channels: ['In-App', 'Email'],
      isUrgent: true,
      isRead: false,
      attachments: [
        { name: 'Midterm_Exam_Room_Seating.pdf', size: '1.2 MB', type: 'pdf' },
        { name: 'Vector_Formula_Sheet_v2.pdf', size: '420 KB', type: 'pdf' },
      ],
    },
    {
      id: 'ann-2',
      title: 'Lab Safety Protocol & Goggle Requirements for Faraday Experiment',
      body: 'A quick reminder about the mandatory lab safety protocols ahead of Thursday\'s electromagnetic induction experiment. All students must wear ANSI-certified splash goggles and closed-toe footwear. Anyone arriving without appropriate PPE will not be admitted to the lab stations.',
      courseCode: 'PHYS-201',
      courseName: 'General Physics & Electromagnetism',
      instructorName: 'Dr. Elena Rostova',
      instructorRole: 'Senior Lab Instructor',
      instructorInitials: 'ER',
      date: 'Yesterday at 3:15 PM',
      channels: ['In-App', 'Email'],
      isUrgent: false,
      isRead: true,
      attachments: [
        { name: 'Lab_Safety_Guidelines_2026.pdf', size: '850 KB', type: 'pdf' },
      ],
    },
    {
      id: 'ann-3',
      title: 'Office Hours Rescheduled for Thursday Morning',
      body: 'Due to a departmental faculty symposium, my usual Thursday afternoon office hours (2:00 PM - 4:00 PM) will be moved to Thursday morning from 9:30 AM to 11:30 AM in Engineering Hall Room 410 or via the Learner Classroom link.',
      courseCode: 'CS-210',
      courseName: 'Data Structures & Algorithms',
      instructorName: 'Dr. Robert Thorne',
      instructorRole: 'Associate Professor',
      instructorInitials: 'RT',
      date: 'Oct 14, 2026',
      channels: ['In-App'],
      isUrgent: false,
      isRead: true,
    },
    {
      id: 'ann-4',
      title: 'Problem Set 3 Grades Released with Solution Rubrics',
      body: 'Problem Set 3 grading has been finalized. Average cohort score was 84.5%. Detailed rubric feedback and question-by-question explanations are now visible under your Practice & Assessments tab. Please review the solutions before next week\'s review session.',
      courseCode: 'MATH-301',
      courseName: 'Multivariable Calculus',
      instructorName: 'Prof. Jonathan Hayes',
      instructorRole: 'Head Lecturer',
      instructorInitials: 'JH',
      date: 'Oct 12, 2026',
      channels: ['In-App', 'SMS'],
      isUrgent: false,
      isRead: true,
    },
    {
      id: 'ann-5',
      title: 'Campus Weather Advisory & Hybrid Learning Contingency',
      body: 'In the event of severe weather forecasted for Friday, lectures will be simultaneously broadcast live via the Classroom Sessions module. Check your notification feed on Friday morning by 07:00 AM for the final operating status.',
      courseCode: 'ALL',
      courseName: 'University Academic Registry',
      instructorName: 'Academic Administration',
      instructorRole: 'Dean of Academic Affairs',
      instructorInitials: 'AA',
      date: 'Oct 10, 2026',
      channels: ['In-App', 'SMS', 'WhatsApp'],
      isUrgent: true,
      isRead: true,
    },
  ]);

  readonly coursesList = computed(() => [
    { code: 'MATH-301', name: 'Multivariable Calculus' },
    { code: 'PHYS-201', name: 'General Physics & Electromagnetism' },
    { code: 'CS-210', name: 'Data Structures & Algorithms' },
  ]);

  readonly urgentAnnouncement = computed(() => {
    return this.announcements().find(a => a.isUrgent && !a.isRead) || this.announcements().find(a => a.isUrgent);
  });

  readonly unreadCount = computed(() => this.announcements().filter(a => !a.isRead).length);

  readonly filteredAnnouncements = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const course = this.selectedCourse();
    const filter = this.filterType();

    return this.announcements().filter(a => {
      // Course filter
      if (course !== 'all' && a.courseCode !== course && a.courseCode !== 'ALL') {
        return false;
      }

      // Filter sub-tabs
      if (filter === 'unread' && a.isRead) {
        return false;
      }
      if (filter === 'urgent' && !a.isUrgent) {
        return false;
      }

      // Unread only toggle
      if (this.unreadOnly() && a.isRead) {
        return false;
      }

      // Query
      if (q) {
        const matchTitle = a.title.toLowerCase().includes(q);
        const matchBody = a.body.toLowerCase().includes(q);
        const matchInstructor = a.instructorName.toLowerCase().includes(q);
        return matchTitle || matchBody || matchInstructor;
      }

      return true;
    });
  });

  readonly urgentAnnouncements = computed(() => this.filteredAnnouncements().filter(a => a.isUrgent));
  readonly regularAnnouncements = computed(() => this.filteredAnnouncements().filter(a => !a.isUrgent));

  viewAnnouncement(announcement: LearnerAnnouncement) {
    this.selectedAnnouncement.set(announcement);
    if (!announcement.isRead) {
      this.announcements.update(list =>
        list.map(a => (a.id === announcement.id ? { ...a, isRead: true } : a))
      );
    }
  }

  closeModal() {
    this.selectedAnnouncement.set(null);
  }

  markAllAsRead() {
    this.announcements.update(list => list.map(a => ({ ...a, isRead: true })));
  }
}
