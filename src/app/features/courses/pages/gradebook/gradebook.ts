import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { ZardDrawerService, ZardDrawerImports, ZardDrawerRef } from '@/shared/components/drawer';

@Component({
  imports: [ZardDrawerImports],
  selector: 'app-gradebook',
  styleUrl: './gradebook.css',
  templateUrl: './gradebook.html',
})
export default class Gradebook {
  private drawerService = inject(ZardDrawerService);
  private drawerRef: ZardDrawerRef<any> | null = null;
  
  gradingDrawerTemplate = viewChild.required<TemplateRef<any>>('gradingDrawer');

  openGradingDrawer() {
    this.drawerRef = this.drawerService.create({
      zTitle: 'SpeedGrader: Intro Essay',
      zContent: this.gradingDrawerTemplate(),
      zPlacement: 'right',
      zCustomClasses: 'w-[450px]',
      zHideFooter: true
    });
  }

  closeGradingDrawer() {
    this.drawerRef?.close();
  }
}
 