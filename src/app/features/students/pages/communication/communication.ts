import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-communication',
  templateUrl: './communication.html',
})
export default class Communication {
    messages = signal([
        { sender: 'You', type: 'message', content: 'Hi Sarah, noticed you missed the latest quiz. Please let me know if you need any help or an extension.', date: 'Oct 16, 2026, 10:30 AM' },
        { sender: 'Sarah Johnson', type: 'reply', content: 'Hi! Im so sorry, I have been dealing with a family emergency. I will catch up this weekend.', date: 'Oct 16, 2026, 2:15 PM' },
        { sender: 'You', type: 'message', content: 'No problem at all. Take the time you need. I have extended the deadline for you until Monday.', date: 'Oct 16, 2026, 4:00 PM' }
    ]);
}
