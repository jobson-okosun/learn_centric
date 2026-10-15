import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports } from '@/shared/components/drawer';
import { ZardComboboxComponent, ZardComboboxImports } from '@/shared/components/combobox';
import { ZardSwitchComponent } from '@/shared/components/switch';
import { ZardDialogService } from '@/shared/components/dialog';
import { LiveSessionModal } from '../../components/live-session/live-session';

@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive, ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports, ZardComboboxComponent, ZardComboboxImports, ZardSwitchComponent],
  selector: 'app-list',
  styleUrl: './list.css',
  templateUrl: './list.html',
})
export default class List {
    scheduleSessionVisible = signal(false);
    startSessionVisible = signal(false);

    private readonly dialog = inject(ZardDialogService);

    openLiveSession() {
        this.dialog.create({
            zContent: LiveSessionModal,
            zHideHeader: true,
            zHideFooter: true,
            zMaskClosable: false,
            zCustomClasses: 'h-[98vh] min-w-[calc(100vw-1rem)] !p-0 overflow-hidden rounded-2xl flex flex-col bg-white'
        });
    }
}
