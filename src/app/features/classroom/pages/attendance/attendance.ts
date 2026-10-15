import { Component, computed, signal } from '@angular/core';
import { ZardDropdownImports } from '@/shared/components/dropdown';

interface StudentAttendance {
  id: string;
  name: string;
  avatar: string;
  studentId: string;
  status: 'present' | 'absent' | 'late' | 'excused' | 'unmarked';
}

@Component({
  imports: [ZardDropdownImports],
  selector: 'app-attendance',
  styleUrl: './attendance.css',
  templateUrl: './attendance.html',
})
export default class Attendance {
  selectedDate = signal<string>(new Date().toISOString().split('T')[0]);

  students = signal<StudentAttendance[]>([
    { id: '1', name: 'Eleanor Pena', avatar: 'https://i.pravatar.cc/150?u=eleanor', studentId: 'STD-001', status: 'present' },
    { id: '2', name: 'Jacob Jones', avatar: 'https://i.pravatar.cc/150?u=jacob', studentId: 'STD-002', status: 'present' },
    { id: '3', name: 'Courtney Henry', avatar: 'https://i.pravatar.cc/150?u=courtney', studentId: 'STD-003', status: 'unmarked' },
    { id: '4', name: 'Arlene McCoy', avatar: 'https://i.pravatar.cc/150?u=arlene', studentId: 'STD-004', status: 'unmarked' },
    { id: '5', name: 'Bessie Cooper', avatar: 'https://i.pravatar.cc/150?u=bessie', studentId: 'STD-005', status: 'unmarked' },
    { id: '6', name: 'Jerome Bell', avatar: 'https://i.pravatar.cc/150?u=jerome', studentId: 'STD-006', status: 'unmarked' },
    { id: '7', name: 'Darrell Steward', avatar: 'https://i.pravatar.cc/150?u=darrell', studentId: 'STD-007', status: 'unmarked' }
  ]);

  presentCount = computed(() => this.students().filter(s => s.status === 'present').length);
  absentCount = computed(() => this.students().filter(s => s.status === 'absent').length);
  lateCount = computed(() => this.students().filter(s => s.status === 'late').length);
  excusedCount = computed(() => this.students().filter(s => s.status === 'excused').length);

  setStatus(studentId: string, status: 'present' | 'absent' | 'late' | 'excused') {
    this.students.update(students => 
      students.map(s => s.id === studentId ? { ...s, status } : s)
    );
  }

  markAllPresent() {
    this.students.update(students => 
      students.map(s => ({ ...s, status: 'present' }))
    );
  }

  saveAttendance() {
    // Save logic here
    console.log('Attendance saved for', this.selectedDate());
  }
}
