import { Component, computed, inject } from '@angular/core';
import { Navigation } from '../navigation/navigation';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  imports: [Navigation, Header, RouterOutlet],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export default class Layout {
  private readonly layoutService = inject(LayoutService);
  readonly isSidebarOpen = computed(() => this.layoutService.isSidebarOpen());

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }
}