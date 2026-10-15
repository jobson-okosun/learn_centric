import { Component, signal, viewChild, TemplateRef, inject } from '@angular/core';
import { ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports } from '@/shared/components/drawer';
import { ZardNavigationMenuImports } from '@/shared/components/navigation-menu';
import { ZardSwitchComponent } from '@/shared/components/switch';
import { ZardDialogService } from '@/shared/components/dialog';
import { ZardComboboxComponent } from '@/shared/components/combobox';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports, ZardNavigationMenuImports, ZardSwitchComponent, ZardComboboxComponent, FormsModule],
  selector: 'app-live-session',
  styleUrl: './live-session.css',
  templateUrl: './live-session.html',
})
export class LiveSessionModal {
  attendeesSidebarOpen = signal(false);
  chatSidebarOpen = signal(false);
  pollsSidebarOpen = signal(false);
  quizzesSidebarOpen = signal(false);

  pollModal = viewChild.required<TemplateRef<any>>('createPollModal');
  quizModal = viewChild.required<TemplateRef<any>>('createQuizModal');
  activeDialogRef?: any;
  private readonly dialog = inject(ZardDialogService);

  openPollDialog() {
    this.activeDialogRef = this.dialog.create({
      zTitle: 'Create Poll',
      zContent: this.pollModal(),
      zHideFooter: true,
      zCustomClasses: '!max-w-xl w-full',
    });
  }

  openQuizDialog() {
    this.activeDialogRef = this.dialog.create({
      zTitle: 'Create Quiz',
      zContent: this.quizModal(),
      zHideFooter: true,
      zCustomClasses: '!max-w-2xl w-full',
    });
  }

  closeDialog() {
    this.activeDialogRef?.close();
  }

  toggleAttendeesSidebar() {
    this.attendeesSidebarOpen.update(v => !v);
  }

  toggleChatSidebar() {
    this.chatSidebarOpen.update(v => !v);
  }

  togglePollsSidebar() {
    this.pollsSidebarOpen.set(!this.pollsSidebarOpen());
    this.quizzesSidebarOpen.set(false);
  }

  toggleQuizzesSidebar() {
    this.quizzesSidebarOpen.set(!this.quizzesSidebarOpen());
    this.pollsSidebarOpen.set(false);
  }

}
