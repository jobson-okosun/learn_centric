import { Component, inject, signal, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZardDialogImports, ZardDialogRef, ZardDialogService } from '@/shared/components/dialog';

export interface ClassSession {
  id: string;
  title: string;
  date: string;
  time: string;
  room: string;
  type: 'lecture' | 'lab' | 'office-hours' | 'review';
  isLiveNow?: boolean;
  instructor: string;
}

export interface ClassAnnouncement {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
  tag: string;
}

export interface ClassRecording {
  id: string;
  title: string;
  recordedDate: string;
  duration: string;
  instructor: string;
  videoUrl: string;
  thumbnailGradient: string;
}

export interface ClassAttendanceLog {
  id: string;
  date: string;
  topic: string;
  type: string;
  checkInTime: string;
  status: 'present' | 'late' | 'absent' | 'excused';
}

@Component({
  imports: [RouterLink, FormsModule, ZardDialogImports],
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html',
})
export default class Details {
  private readonly dialogService = inject(ZardDialogService);
  private dialogRef: ZardDialogRef<any> | null = null;

  readonly activeTab = signal<'overview' | 'recordings' | 'calendar' | 'attendance'>('overview');
  readonly currentMonth = signal('October 2026');
  readonly calendarView = signal<'agenda' | 'month'>('agenda');

  // Active video player state
  readonly activeRecording = signal<ClassRecording | null>(null);

  // Classroom modal state
  readonly isMuted = signal(true);
  readonly isVideoOn = signal(false);
  readonly isHandRaised = signal(false);
  readonly chatMessageInput = signal('');
  readonly chatMessages = signal<{ sender: string; time: string; text: string; isMe?: boolean }[]>([
    { sender: 'Dr. Sarah Johnson', time: '2:02 PM', text: 'Welcome everyone! Today we will verify Stokes’ theorem on boundary contours.' },
    { sender: 'Sam Smith', time: '2:05 PM', text: 'Does the normal vector always follow the right-hand rule?' },
    { sender: 'Dr. Sarah Johnson', time: '2:07 PM', text: 'Yes, counterclockwise boundary traversal defines the positive normal.' },
  ]);

  readonly classInfo = signal({
    id: 'math-204-a',
    code: 'MATH-204-A',
    title: 'Multivariable Calculus · Cohort A',
    courseName: 'MATH-204: Advanced Multivariable Calculus & Vector Fields',
    cohort: 'Fall 2026 Cohort',
    instructor: 'Dr. Sarah Johnson',
    instructorRole: 'Associate Professor of Mathematics',
    instructorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
    room: 'Virtual Room A-102',
    isLiveNow: true,
    classmatesCount: 34,
    attendanceRate: 96,
    currentGrade: '96.2% (Grade A)',
  });

  readonly upcomingSessions = signal<ClassSession[]>([
    {
      id: 's-1',
      title: 'Stokes’ Theorem & Surface Circulation',
      date: 'Today',
      time: '2:00 PM – 3:30 PM',
      room: 'Virtual Room A-102',
      type: 'lecture',
      isLiveNow: true,
      instructor: 'Dr. Sarah Johnson',
    },
    {
      id: 's-2',
      title: 'Problem Set 5 Interactive Recitation & Q&A',
      date: 'Thursday, Oct 16',
      time: '11:00 AM – 12:30 PM',
      room: 'Virtual Room A-102',
      type: 'review',
      instructor: 'Dr. Sarah Johnson',
    },
    {
      id: 's-3',
      title: 'Vector Calculus Lab 3: Numerical Flux Simulation',
      date: 'Monday, Oct 20',
      time: '1:00 PM – 3:00 PM',
      room: 'Lab Studio 4',
      type: 'lab',
      instructor: 'TA Marcus Vance',
    },
  ]);

  readonly announcements = signal<ClassAnnouncement[]>([
    {
      id: 'a-1',
      title: 'Midterm Review Guide & Problem Set 5 Due Date Shift',
      author: 'Dr. Sarah Johnson',
      authorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
      date: 'Yesterday at 4:15 PM',
      content: 'I have posted the solutions to Practice Exam 1 in the course materials. In addition, the submission portal for Problem Set 5 will remain open until Friday at midnight.',
      tag: 'Important',
    },
    {
      id: 'a-2',
      title: 'Office Hours Location Update for Wednesday',
      author: 'Dr. Sarah Johnson',
      authorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
      date: 'Oct 11, 2026',
      content: 'Wednesday office hours will be held directly in our virtual room stage to accommodate online questions regarding Stokes’ Theorem boundary conditions.',
      tag: 'Logistics',
    },
  ]);

  readonly recordings = signal<ClassRecording[]>([
    {
      id: 'rec-1',
      title: 'Green’s Theorem & Area Calculations in Flux',
      recordedDate: 'Recorded Oct 12, 2026',
      duration: '78:15',
      instructor: 'Dr. Sarah Johnson',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailGradient: 'from-violet-900 to-indigo-950',
    },
    {
      id: 'rec-2',
      title: 'Line Integrals with Respect to Arc Length',
      recordedDate: 'Recorded Oct 09, 2026',
      duration: '64:20',
      instructor: 'Dr. Sarah Johnson',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailGradient: 'from-blue-900 to-slate-950',
    },
    {
      id: 'rec-3',
      title: 'Vector Fields, Divergence & Curl Foundations',
      recordedDate: 'Recorded Oct 05, 2026',
      duration: '82:10',
      instructor: 'Dr. Sarah Johnson',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnailGradient: 'from-indigo-900 to-purple-950',
    },
    {
      id: 'rec-4',
      title: 'Lagrange Multipliers with Dual Constraints',
      recordedDate: 'Recorded Sep 28, 2026',
      duration: '58:00',
      instructor: 'Dr. Sarah Johnson',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailGradient: 'from-slate-900 to-zinc-950',
    },
  ]);

  readonly attendanceHistory = signal<ClassAttendanceLog[]>([
    { id: 'att-1', date: 'Today, Oct 14', topic: 'Stokes’ Theorem & Surface Circulation', type: 'Live Lecture', checkInTime: '2:01 PM', status: 'present' },
    { id: 'att-2', date: 'Oct 12, 2026', topic: 'Green’s Theorem & Area Formula in Flux', type: 'Live Lecture', checkInTime: '2:03 PM', status: 'present' },
    { id: 'att-3', date: 'Oct 09, 2026', topic: 'Line Integrals with Respect to Arc Length', type: 'Live Lecture', checkInTime: '2:14 PM', status: 'late' },
    { id: 'att-4', date: 'Oct 05, 2026', topic: 'Vector Fields, Divergence & Curl Foundations', type: 'Live Lecture', checkInTime: '2:00 PM', status: 'present' },
    { id: 'att-5', date: 'Oct 02, 2026', topic: 'Vector Calculus Lab 2: Directional Derivatives', type: 'Lab Session', checkInTime: '1:02 PM', status: 'present' },
    { id: 'att-6', date: 'Sep 28, 2026', topic: 'Lagrange Multipliers with Dual Constraints', type: 'Live Lecture', checkInTime: '—', status: 'absent' },
  ]);

  readonly monthDays = signal<number[]>([...Array.from({ length: 31 }, (_, i) => i + 1)]);

  setTab(tab: 'overview' | 'recordings' | 'calendar' | 'attendance') {
    this.activeTab.set(tab);
  }

  setCalendarView(v: 'agenda' | 'month') {
    this.calendarView.set(v);
  }

  enterLiveStage(template: TemplateRef<any>) {
    this.dialogRef = this.dialogService.create({
      zTitle: this.classInfo().title,
      zContent: template,
      zHideFooter: true,
      zWidth: '6xl',
    });
  }

  closeStageModal() {
    this.dialogRef?.close();
    this.dialogRef = null;
  }

  openRecordingPlayer(rec: ClassRecording, template: TemplateRef<any>) {
    this.activeRecording.set(rec);
    this.dialogRef = this.dialogService.create({
      zTitle: rec.title,
      zContent: template,
      zHideFooter: true,
      zWidth: '4xl',
    });
  }

  closeRecordingPlayer() {
    this.dialogRef?.close();
    this.dialogRef = null;
    this.activeRecording.set(null);
  }

  toggleHandRaise() {
    this.isHandRaised.update((v) => !v);
  }

  toggleMute() {
    this.isMuted.update((v) => !v);
  }

  toggleVideo() {
    this.isVideoOn.update((v) => !v);
  }

  sendChatMessage() {
    const text = this.chatMessageInput().trim();
    if (!text) return;

    this.chatMessages.update((msgs) => [
      ...msgs,
      {
        sender: 'Alex Morgan (You)',
        time: 'Just now',
        text,
        isMe: true,
      },
    ]);
    this.chatMessageInput.set('');
  }
}
