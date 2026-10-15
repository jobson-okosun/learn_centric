import { Component, computed, inject, signal, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZardDialogImports, ZardDialogRef, ZardDialogService } from '@/shared/components/dialog';

export interface ClassSessionItem {
  id: string;
  title: string;
  courseCode: string;
  courseTitle: string;
  classCohort: string;
  instructor: string;
  instructorAvatar: string;
  status: 'live' | 'upcoming' | 'past';
  timeLabel: string;
  durationLabel: string;
  room: string;
  attendeesCount: number;
  totalStudents: number;
  myAttendanceStatus?: 'attended' | 'absent' | 'excused';
}

export interface SessionRecordingItem {
  id: string;
  title: string;
  courseCode: string;
  courseTitle: string;
  classCohort: string;
  instructor: string;
  recordedDate: string;
  duration: string;
  videoUrl: string;
  thumbnailGradient: string;
}

@Component({
  imports: [FormsModule, ZardDialogImports],
  selector: 'app-sessions',
  styleUrl: './sessions.css',
  templateUrl: './sessions.html',
})
export default class Sessions {
  private readonly dialogService = inject(ZardDialogService);
  private dialogRef: ZardDialogRef<any> | null = null;

  readonly activeTab = signal<'live' | 'upcoming' | 'past' | 'recordings'>('live');
  readonly selectedCourse = signal('all');
  readonly selectedClass = signal('all');
  readonly searchQuery = signal('');

  // Live classroom stage simulator state
  readonly activeLiveSession = signal<ClassSessionItem | null>(null);
  readonly isMuted = signal(true);
  readonly isVideoOn = signal(false);
  readonly isHandRaised = signal(false);
  readonly chatMessageInput = signal('');
  readonly chatMessages = signal<{ sender: string; time: string; text: string; isMe?: boolean }[]>([
    { sender: 'Dr. Sarah Johnson', time: '2:02 PM', text: 'Welcome everyone! Today we will verify Stokes’ theorem on boundary contours.' },
    { sender: 'Sam Smith', time: '2:05 PM', text: 'Does the normal vector always follow the right-hand rule?' },
    { sender: 'Dr. Sarah Johnson', time: '2:07 PM', text: 'Yes, counterclockwise boundary traversal defines the positive normal.' },
  ]);

  // Video recording viewer state
  readonly activeRecording = signal<SessionRecordingItem | null>(null);

  readonly allSessions = signal<ClassSessionItem[]>([
    {
      id: 's-math-204-live',
      title: 'Stokes’ Theorem & Boundary Circulation',
      courseCode: 'MATH-204',
      courseTitle: 'Multivariable Calculus',
      classCohort: 'Section A · Fall 2026',
      instructor: 'Dr. Sarah Johnson',
      instructorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
      status: 'live',
      timeLabel: 'Started 15m ago',
      durationLabel: '90 mins',
      room: 'Virtual Room A-102',
      attendeesCount: 24,
      totalStudents: 34,
    },
    {
      id: 's-bio-101-live',
      title: 'Cellular Division & Mitosis Live Q&A',
      courseCode: 'BIO-101',
      courseTitle: 'Introduction to Biology',
      classCohort: 'Section B · Fall 2026',
      instructor: 'Prof. David Miller',
      instructorAvatar: 'https://ui-avatars.com/api/?name=David+Miller&background=10B981&color=fff',
      status: 'live',
      timeLabel: 'Started 5m ago',
      durationLabel: '60 mins',
      room: 'Bio Stage 1',
      attendeesCount: 38,
      totalStudents: 42,
    },
    {
      id: 's-cs-106-up',
      title: 'Balanced Binary Search Trees & AVL Rotations',
      courseCode: 'CS-106',
      courseTitle: 'Data Structures & Algorithms',
      classCohort: 'Lab 1 · Fall 2026',
      instructor: 'Dr. Alan Vance',
      instructorAvatar: 'https://ui-avatars.com/api/?name=Alan+Vance&background=6366F1&color=fff',
      status: 'upcoming',
      timeLabel: 'Tomorrow, 10:00 AM',
      durationLabel: '75 mins',
      room: 'CS Studio 3',
      attendeesCount: 0,
      totalStudents: 28,
    },
    {
      id: 's-math-204-up',
      title: 'Problem Set 5 Interactive Recitation',
      courseCode: 'MATH-204',
      courseTitle: 'Multivariable Calculus',
      classCohort: 'Section A · Fall 2026',
      instructor: 'Dr. Sarah Johnson',
      instructorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
      status: 'upcoming',
      timeLabel: 'Thursday, 2:00 PM',
      durationLabel: '60 mins',
      room: 'Virtual Room A-102',
      attendeesCount: 0,
      totalStudents: 34,
    },
    {
      id: 's-math-204-past1',
      title: 'Green’s Theorem & Area Calculations in Flux',
      courseCode: 'MATH-204',
      courseTitle: 'Multivariable Calculus',
      classCohort: 'Section A · Fall 2026',
      instructor: 'Dr. Sarah Johnson',
      instructorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
      status: 'past',
      timeLabel: 'Oct 12, 2026 · 2:00 PM',
      durationLabel: '78 mins',
      room: 'Virtual Room A-102',
      attendeesCount: 32,
      totalStudents: 34,
      myAttendanceStatus: 'attended',
    },
    {
      id: 's-bio-101-past1',
      title: 'Membrane Transport & Osmosis Principles',
      courseCode: 'BIO-101',
      courseTitle: 'Introduction to Biology',
      classCohort: 'Section B · Fall 2026',
      instructor: 'Prof. David Miller',
      instructorAvatar: 'https://ui-avatars.com/api/?name=David+Miller&background=10B981&color=fff',
      status: 'past',
      timeLabel: 'Oct 10, 2026 · 11:00 AM',
      durationLabel: '60 mins',
      room: 'Bio Stage 1',
      attendeesCount: 40,
      totalStudents: 42,
      myAttendanceStatus: 'attended',
    },
  ]);

  readonly allRecordings = signal<SessionRecordingItem[]>([
    {
      id: 'rec-1',
      title: 'Green’s Theorem & Area Calculations in Flux',
      courseCode: 'MATH-204',
      courseTitle: 'Multivariable Calculus',
      classCohort: 'Section A',
      instructor: 'Dr. Sarah Johnson',
      recordedDate: 'Recorded Oct 12, 2026',
      duration: '78:15',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailGradient: 'from-violet-900 to-indigo-950',
    },
    {
      id: 'rec-2',
      title: 'Membrane Transport & Osmosis Principles',
      courseCode: 'BIO-101',
      courseTitle: 'Introduction to Biology',
      classCohort: 'Section B',
      instructor: 'Prof. David Miller',
      recordedDate: 'Recorded Oct 10, 2026',
      duration: '59:40',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnailGradient: 'from-emerald-900 to-teal-950',
    },
    {
      id: 'rec-3',
      title: 'Line Integrals with Respect to Arc Length',
      courseCode: 'MATH-204',
      courseTitle: 'Multivariable Calculus',
      classCohort: 'Section A',
      instructor: 'Dr. Sarah Johnson',
      recordedDate: 'Recorded Oct 09, 2026',
      duration: '64:20',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailGradient: 'from-blue-900 to-slate-950',
    },
    {
      id: 'rec-4',
      title: 'Heaps, Priority Queues & HeapSort',
      courseCode: 'CS-106',
      courseTitle: 'Data Structures & Algorithms',
      classCohort: 'Lab 1',
      instructor: 'Dr. Alan Vance',
      recordedDate: 'Recorded Oct 07, 2026',
      duration: '82:10',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailGradient: 'from-indigo-900 to-purple-950',
    },
  ]);

  readonly filteredSessions = computed(() => {
    const tab = this.activeTab();
    const course = this.selectedCourse();
    const cls = this.selectedClass();
    const query = this.searchQuery().trim().toLowerCase();

    return this.allSessions().filter((s) => {
      const matchesTab = s.status === tab;
      const matchesCourse = course === 'all' || s.courseCode === course;
      const matchesClass = cls === 'all' || s.classCohort.includes(cls);
      const matchesQuery =
        !query ||
        s.title.toLowerCase().includes(query) ||
        s.courseTitle.toLowerCase().includes(query) ||
        s.instructor.toLowerCase().includes(query);

      return matchesTab && matchesCourse && matchesClass && matchesQuery;
    });
  });

  readonly filteredRecordings = computed(() => {
    const course = this.selectedCourse();
    const query = this.searchQuery().trim().toLowerCase();

    return this.allRecordings().filter((r) => {
      const matchesCourse = course === 'all' || r.courseCode === course;
      const matchesQuery =
        !query ||
        r.title.toLowerCase().includes(query) ||
        r.courseTitle.toLowerCase().includes(query) ||
        r.instructor.toLowerCase().includes(query);

      return matchesCourse && matchesQuery;
    });
  });

  setTab(tab: 'live' | 'upcoming' | 'past' | 'recordings') {
    this.activeTab.set(tab);
  }

  enterLiveSession(session: ClassSessionItem, template: TemplateRef<any>) {
    this.activeLiveSession.set(session);
    this.dialogRef = this.dialogService.create({
      zTitle: session.title,
      zContent: template,
      zHideFooter: true,
      zWidth: '6xl',
    });
  }

  closeClassroomModal() {
    this.dialogRef?.close();
    this.dialogRef = null;
    this.activeLiveSession.set(null);
  }

  openRecordingModal(recording: SessionRecordingItem, template: TemplateRef<any>) {
    this.activeRecording.set(recording);
    this.dialogRef = this.dialogService.create({
      zTitle: recording.title,
      zContent: template,
      zHideFooter: true,
      zWidth: '4xl',
    });
  }

  closeRecordingModal() {
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
