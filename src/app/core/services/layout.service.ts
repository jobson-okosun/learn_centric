import { signal, Service } from '@angular/core';

@Service()
export class LayoutService {
  private readonly defaultState = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
  
  readonly isSidebarOpen = signal<boolean>(this.defaultState);

  toggleSidebar(): void {
    this.isSidebarOpen.update((state) => !state);
  }

  setSidebarState(isOpen: boolean): void {
    this.isSidebarOpen.set(isOpen);
  }
}
