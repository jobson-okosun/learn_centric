import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardDropdownImports } from '@/shared/components/dropdown';

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  lastActive: string;
  unread: boolean;
  color: string;
}

interface ThreadMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  time: string;
  isSelf: boolean;
}

@Component({
  selector: 'app-groups',
  imports: [CommonModule, FormsModule, ZardDropdownImports],
  styleUrl: './groups.css',
  templateUrl: './groups.html',
})
export default class Groups {
  searchQuery = signal('');
  
  groups = signal<Group[]>([
    {
      id: 'g1',
      name: 'Biology 201 - Section A',
      description: 'Morning cohort study group',
      members: 24,
      lastActive: '10 mins ago',
      unread: true,
      color: 'bg-blue-500'
    },
    {
      id: 'g2',
      name: 'Physics Lab Team 3',
      description: 'Project discussion and coordination',
      members: 4,
      lastActive: 'Yesterday',
      unread: false,
      color: 'bg-indigo-500'
    },
    {
      id: 'g3',
      name: 'Faculty Advisory Board',
      description: 'Cross-department curriculum planning',
      members: 12,
      lastActive: 'Tuesday',
      unread: false,
      color: 'bg-emerald-500'
    }
  ]);

  activeGroupId = signal<string | null>('g1');

  activeThread = signal<ThreadMessage[]>([
    {
      id: 't1',
      senderName: 'Sarah Johnson',
      senderAvatar: 'female.png',
      content: 'Has anyone started on the lab report for next week?',
      time: '10:42 AM',
      isSelf: false
    },
    {
      id: 't2',
      senderName: 'David Chen',
      senderAvatar: 'male.png',
      content: 'I did the data analysis part, just need to write the conclusion.',
      time: '11:15 AM',
      isSelf: false
    }
  ]);

  replyDraft = signal('');

  selectGroup(id: string) {
    this.activeGroupId.set(id);
    this.groups.update(groups => groups.map(g => g.id === id ? { ...g, unread: false } : g));
    
    if (id === 'g1') {
      this.activeThread.set([
        {
          id: 't1',
          senderName: 'Sarah Johnson',
          senderAvatar: 'female.png',
          content: 'Has anyone started on the lab report for next week?',
          time: '10:42 AM',
          isSelf: false
        },
        {
          id: 't2',
          senderName: 'David Chen',
          senderAvatar: 'male.png',
          content: 'I did the data analysis part, just need to write the conclusion.',
          time: '11:15 AM',
          isSelf: false
        }
      ]);
    } else {
      this.activeThread.set([
        {
          id: 't1',
          senderName: 'Emma Davis',
          senderAvatar: 'female.png',
          content: 'Here is the link to our shared document.',
          time: 'Yesterday',
          isSelf: false
        }
      ]);
    }
  }

  sendReply() {
    if (!this.replyDraft().trim()) return;
    
    this.activeThread.update(thread => [
      ...thread,
      {
        id: 't' + Date.now(),
        senderName: 'Instructor (You)',
        senderAvatar: 'male.png',
        content: this.replyDraft(),
        time: 'Just now',
        isSelf: true
      }
    ]);
    
    this.replyDraft.set('');
  }
}
