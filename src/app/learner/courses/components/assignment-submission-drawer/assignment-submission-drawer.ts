import { Component, computed, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface UploadedFileItem {
  name: string;
  size: string;
  type: 'pdf' | 'code' | 'zip' | 'image' | 'doc';
  progress: number;
}

export interface SubmissionReceiptData {
  hash: string;
  timestamp: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  assignmentTitle: string;
  version: number;
  files: string[];
}

@Component({
  selector: 'app-assignment-submission-drawer',
  imports: [FormsModule],
  templateUrl: './assignment-submission-drawer.html',
  styleUrl: './assignment-submission-drawer.css',
})
export class AssignmentSubmissionDrawer {
  readonly assignmentId = input<string>('');
  readonly assignmentTitle = input<string>('Assignment Submission');
  readonly courseCode = input<string>('MATH-301');
  readonly courseName = input<string>('Multivariable Calculus');
  readonly points = input<string>('100 pts');
  readonly dueDate = input<string>('Oct 24, 2026 at 11:59 PM');
  readonly currentVersion = input<number>(1);

  readonly isOpen = model<boolean>(false);
  readonly submitted = output<SubmissionReceiptData>();

  // State
  readonly activeTab = signal<'upload' | 'text'>('upload');
  readonly honorCodePledged = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly isDragging = signal<boolean>(false);

  // Tab 1: Upload
  readonly uploadedFiles = signal<UploadedFileItem[]>([
    {
      name: 'vector_calculus_solution_draft.pdf',
      size: '2.4 MB',
      type: 'pdf',
      progress: 100,
    },
  ]);

  // Tab 2: Text & Code
  readonly textContent = signal<string>(
    '### Problem Set Solution Brief\n\n1. Surface Integrals & Stokes\' Theorem:\nLet S be the oriented piecewise smooth surface bounded by simple closed contour C.\nUsing the formula: $$\\iint_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S} = \\oint_C \\mathbf{F} \\cdot d\\mathbf{r}$$\n\n2. Numerical Python Simulation:\nImplemented discrete vector field flux convergence in simulation_stokes.py with 10,000 grid nodes.'
  );

  // Final Receipt Modal
  readonly receiptModal = signal<SubmissionReceiptData | null>(null);
  readonly copiedHash = signal<boolean>(false);

  // Computed validity
  readonly canSubmit = computed(() => {
    const hasFiles = this.uploadedFiles().length > 0;
    const hasText = this.textContent().trim().length > 20;
    const hasWork = hasFiles || hasText;
    return hasWork && this.honorCodePledged() && !this.isSubmitting();
  });

  close(): void {
    this.isOpen.set(false);
  }

  setTab(tab: 'upload' | 'text'): void {
    this.activeTab.set(tab);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.handleFileList(event.dataTransfer.files);
    }
  }

  onFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.handleFileList(target.files);
    }
  }

  private handleFileList(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let type: UploadedFileItem['type'] = 'doc';

      if (ext === 'pdf') type = 'pdf';
      else if (['py', 'ipynb', 'ts', 'js', 'cpp', 'java'].includes(ext)) type = 'code';
      else if (['zip', 'tar', 'gz', 'rar'].includes(ext)) type = 'zip';
      else if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(ext)) type = 'image';

      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

      this.uploadedFiles.update((list) => [
        ...list,
        {
          name: file.name,
          size: sizeStr,
          type,
          progress: 100,
        },
      ]);
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.update((list) => list.filter((_, i) => i !== index));
  }

  submitFinal(): void {
    if (!this.canSubmit()) return;

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);

      // Generate verification receipt
      const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
      const receipt: SubmissionReceiptData = {
        hash: `LC-SUB-${new Date().getFullYear()}-${randomHex}-F9A`,
        timestamp: new Date().toUTCString(),
        studentId: 'STU-88219',
        studentName: 'Alex Mercer',
        courseCode: this.courseCode(),
        assignmentTitle: this.assignmentTitle(),
        version: this.currentVersion(),
        files: this.uploadedFiles().map((f) => f.name),
      };

      this.receiptModal.set(receipt);
      this.submitted.emit(receipt);
    }, 1000);
  }

  copyReceiptHash(): void {
    const hash = this.receiptModal()?.hash;
    if (hash) {
      navigator.clipboard.writeText(hash);
      this.copiedHash.set(true);
      setTimeout(() => this.copiedHash.set(false), 2000);
    }
  }

  dismissReceipt(): void {
    this.receiptModal.set(null);
    this.isOpen.set(false);
  }
}
