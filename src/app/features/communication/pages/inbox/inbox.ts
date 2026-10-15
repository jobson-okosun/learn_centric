import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ZardDropdownImports } from '@/shared/components/dropdown';

interface Message {
  id: string;
  senderName: string;
  senderAvatar: string;
  courseContext: string;
  moduleContext: string;
  preview: string;
  time: string;
  unread: boolean;
  selected?: boolean;
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
  selector: 'app-inbox',
  imports: [CommonModule, FormsModule, ZardDropdownImports],
  templateUrl: './inbox.html',
  styleUrl: './inbox.css'
})
export default class Inbox {
  searchQuery = signal('');
  activeFilter = signal<'all' | 'unread' | 'mentions'>('all');
  
  messages = signal<Message[]>([
    {
      id: '1',
      senderName: 'Sarah Johnson',
      senderAvatar: 'images/avatars/female.png',
      courseContext: 'Biology 201',
      moduleContext: 'Cell Structure',
      preview: 'I don\'t quite understand how the mitochondria produces ATP in this specific phase.',
      time: '10:42 AM',
      unread: true
    },
    {
      id: '2',
      senderName: 'David Chen',
      senderAvatar: 'images/avatars/male.png',
      courseContext: 'Physics 102',
      moduleContext: 'Thermodynamics',
      preview: 'Is the assignment due tonight at midnight or tomorrow?',
      time: 'Yesterday',
      unread: false
    },
    {
      id: '3',
      senderName: 'Emma Davis',
      senderAvatar: 'images/avatars/female.png',
      courseContext: 'Biology 201',
      moduleContext: 'Genetics Lab',
      preview: 'Could you review my group\'s proposed methodology before we start?',
      time: 'Tuesday',
      unread: false
    },
    {
      id: '4',
      senderName: 'Emma Davis',
      senderAvatar: 'images/avatars/female.png',
      courseContext: 'Biology 201',
      moduleContext: 'Genetics Lab',
      preview: 'Could you review my group\'s proposed methodology before we start?',
      time: 'Tuesday',
      unread: false
    },
    {
      id: '5',
      senderName: 'Emma Davis',
      senderAvatar: 'images/avatars/female.png',
      courseContext: 'Biology 201',
      moduleContext: 'Genetics Lab',
      preview: 'Could you review my group\'s proposed methodology before we start?',
      time: 'Tuesday',
      unread: false
    }
  ]);

  activeMessageId = signal<string | null>('1');

  activeThread = signal<ThreadMessage[]>([
    {
      id: 't1',
      senderName: 'Sarah Johnson',
      senderAvatar: 'images/avatars/female.png',
      content: 'I don\'t quite understand how the mitochondria produces ATP in this specific phase. The textbook mentions the electron transport chain, but I\'m losing track of the proton gradient.',
      time: '10:42 AM',
      isSelf: false
    }
  ]);

  replyDraft = signal('');

  selectMessage(id: string) {
    this.activeMessageId.set(id);
    this.messages.update(msgs => msgs.map(m => m.id === id ? { ...m, unread: false } : m));
    
    if (id === '1') {
      this.activeThread.set([
        {
          id: 't1',
          senderName: 'Sarah Johnson',
          senderAvatar: 'images/avatars/female.png',
          content: 'I don\'t quite understand how the mitochondria produces ATP in this specific phase. The textbook mentions the electron transport chain, but I\'m losing track of the proton gradient.',
          time: '10:42 AM',
          isSelf: false
        }
      ]);
    } else if (id === '2') {
       this.activeThread.set([
        {
          id: 't2',
          senderName: 'David Chen',
          senderAvatar: 'images/avatars/male.png',
          content: 'Is the assignment due tonight at midnight or tomorrow?',
          time: 'Yesterday 4:15 PM',
          isSelf: false
        }
      ]);
    } else {
        this.activeThread.set([
        {
          id: 't3',
          senderName: 'Emma Davis',
          senderAvatar: 'images/avatars/female.png',
          content: 'Could you review my group\'s proposed methodology before we start?',
          time: 'Tuesday 9:00 AM',
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
        senderAvatar: 'images/avatars/male.png',
        content: this.replyDraft(),
        time: 'Just now',
        isSelf: true
      }
    ]);
    
    this.replyDraft.set('');
  }
}
