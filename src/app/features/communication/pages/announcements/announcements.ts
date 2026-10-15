import { Component, signal, inject, viewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardDrawerImports } from '@/shared/components/drawer';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { ZardSwitchComponent } from '@/shared/components/switch';
import { ZardComboboxComponent } from '@/shared/components/combobox';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';

interface Announcement {
  id: string;
  title: string;
  body: string;
  status: 'published' | 'scheduled' | 'draft' | 'failed';
  date: string;
  target: string;
  channels: string[];
}

@Component({
  selector: 'app-announcements',
  imports: [CommonModule, FormsModule, ZardDrawerImports, ZardDropdownImports, ZardSwitchComponent, ZardComboboxComponent, ZardDialogImports],
  styleUrl: './announcements.css',
  templateUrl: './announcements.html',
})
export default class Announcements {
  private readonly dialogService = inject(ZardDialogService);
  addStudentTemplate = viewChild.required<TemplateRef<any>>('addStudentTemplate');
  activeDialogRef: ZardDialogRef<any> | null = null;

  // List State
  announcements = signal<Announcement[]>([
    {
      id: 'a2',
      title: 'Study Group Reminders',
      body: 'Don\'t forget your weekly study group sessions tomorrow.',
      status: 'scheduled',
      date: 'Tomorrow, 9:00 AM',
      target: 'Selected Groups',
      channels: ['In-App', 'SMS']
    },
    {
      id: 'a1',
      title: 'Midterm exam format changes',
      body: 'Please be aware that the midterm format has been updated to include 2 essay questions.',
      status: 'published',
      date: 'Oct 12, 2026',
      target: 'Whole Class',
      channels: ['In-App', 'Email']
    },
    {
      id: 'a3',
      title: 'Lab safety protocols',
      body: 'A quick reminder about the mandatory lab safety protocols...',
      status: 'draft',
      date: 'Last edited 2 days ago',
      target: 'Whole Class',
      channels: ['In-App']
    },
    {
      id: 'a4',
      title: 'Campus closure due to weather',
      body: 'The campus will be closed tomorrow. All classes are moved online.',
      status: 'failed',
      date: 'Oct 10, 2026',
      target: 'Whole Class',
      channels: ['SMS', 'WhatsApp']
    }
  ]);

  searchQuery = signal('');

  // Composer Drawer State
  isDrawerOpen = signal(false);

  // Form State
  editingId = signal<string | null>(null);
  title = signal('');
  body = signal('');

  target = signal<'class' | 'groups' | 'students'>('class');
  selectedGroups = signal<string[]>([]);
  selectedClasses = signal<string[]>([]);

  publishMode = signal<'now' | 'schedule' | 'draft'>('now');
  publishAt = signal('');

  allowComments = signal(true);
  guardiansIncluded = signal(false);

  // Channels
  channelInApp = signal(true);
  channelEmail = signal(true);
  channelSms = signal(false);
  channelWhatsapp = signal(false);

  // Mock Groups for Combobox
  assigneeOptions = [
    { label: 'Group A (Morning)', value: 'g1' },
    { label: 'Group B (Afternoon)', value: 'g2' },
    { label: 'Study Group - Genetics', value: 'g3' },
  ];

  classOptions = [
    { label: 'Biology 201 - Cohort A', value: 'c1' },
    { label: 'Biology 201 - Cohort B', value: 'c2' },
  ];

  openStudentDialog() {
    this.activeDialogRef = this.dialogService.create({
      zTitle: 'Assign Students',
      zContent: this.addStudentTemplate(),
      zHideFooter: true,
      zCustomClasses: '!max-w-md w-full',
    });
  }

  closeStudentDialog() {
    this.activeDialogRef?.close();
  }

  openComposer(announcement?: Announcement) {
    if (announcement) {
      this.editingId.set(announcement.id);
      this.title.set(announcement.title);
      this.body.set(announcement.body);
    } else {
      this.editingId.set(null);
      this.title.set('');
      this.body.set('');
      this.channelInApp.set(true);
      this.channelEmail.set(true);
      this.channelSms.set(false);
      this.channelWhatsapp.set(false);
      this.publishMode.set('now');
    }
    this.isDrawerOpen.set(true);
  }

  closeDrawer() {
    this.isDrawerOpen.set(false);
  }

  toggleGroup(groupId: string) {
    if (this.selectedGroups().includes(groupId)) {
      this.selectedGroups.update(groups => groups.filter(id => id !== groupId));
    } else {
      this.selectedGroups.update(groups => [...groups, groupId]);
    }
  }

  saveAnnouncement() {
    console.log('Saving announcement:', {
      title: this.title(),
      publishMode: this.publishMode()
    });
    this.closeDrawer();
  }

  broadcastNow(id: string) {
    console.log('Broadcasting now:', id);
  }

  resend(id: string) {
    console.log('Resending:', id);
  }
}
