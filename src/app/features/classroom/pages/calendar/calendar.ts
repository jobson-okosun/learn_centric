import { Component, inject, signal, TemplateRef } from '@angular/core';
import { ZardDialogService, ZardDialogImports, ZardDialogRef } from '@/shared/components/dialog';
import { ZardDropdownImports } from '@/shared/components/dropdown';

export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

@Component({
  selector: 'app-calendar',
  imports: [ZardDialogImports, ZardDropdownImports],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export default class Calendar {
  private dialogService = inject(ZardDialogService);
  private dialogRef: ZardDialogRef<any> | null = null;
  
  view = signal<CalendarView>('agenda');

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  hours = Array.from({length: 12}, (_, i) => i + 8); // 8 AM to 7 PM

  monthDays = Array.from({length: 35}, (_, i) => {
     const date = new Date(2026, 9, i - 3);
     return { 
       date: date.getDate(), 
       isCurrentMonth: date.getMonth() === 9,
       isToday: date.getDate() === 15 && date.getMonth() === 9
     };
  });

  setView(v: CalendarView) {
    this.view.set(v);
  }

  openCreateEventModal(template: TemplateRef<any>) {
    this.dialogRef = this.dialogService.create({
      zTitle: 'Create Event',
      zContent: template,
      zHideFooter: true,
      zWidth: 'md',
    });
  }

  closeCreateEventModal() {
    this.dialogRef?.close();
  }
}
