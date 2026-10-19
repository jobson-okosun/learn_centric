import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  templateUrl: './classroom.html',
  styleUrl: './classroom.css',
})
export default class Classroom {
  readonly videoQuality = signal<'1080p' | '720p' | 'adaptive'>('1080p');
  readonly frameRate = signal<'60fps' | '30fps'>('60fps');
  readonly noiseSuppression = signal<'ai-enhanced' | 'standard' | 'off'>('ai-enhanced');

  readonly muteStudentsOnEntry = signal(true);
  readonly allowStudentChat = signal(true);
  readonly allowStudentScreenShare = signal(false);
  readonly enableHandRaiseQueue = signal(true);
  readonly allowDirectMessagesBetweenStudents = signal(false);

  readonly autoRecordLectures = signal(true);
  readonly generateAiTranscripts = signal(true);
  readonly autoPublishRecordings = signal(true);
  readonly retentionDays = signal<'180' | '365' | 'indefinite'>('180');

  readonly whiteboardGrid = signal<'dots' | 'grid' | 'blank'>('dots');
  readonly persistWhiteboardNotes = signal(true);
  readonly breakoutTimerDefault = signal(15);

  readonly saveSuccess = signal(false);

  saveStageSettings(): void {
    this.saveSuccess.set(true);
    setTimeout(() => {
      this.saveSuccess.set(false);
    }, 3500);
  }
}
