import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAteEditor } from '@flogeez/angular-tiptap-editor';
import { routes } from './app.routes';
import { provideZard } from '@/shared/core/provider/providezard';
import { provideZardCharts } from '@/shared/components/chart';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideZard(),
    provideZardCharts(),
    provideAteEditor()
  ]
};
