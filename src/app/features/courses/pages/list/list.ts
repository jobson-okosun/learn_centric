import { Component, signal } from '@angular/core';
import { ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports } from '@/shared/components/drawer';
import { ZardComboboxComponent, ZardComboboxImports } from '@/shared/components/combobox';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports, ZardComboboxComponent, ZardComboboxImports, RouterLink], 
  selector: 'app-list',
  styleUrl: './list.css',
  templateUrl: './list.html',
})
export default class List {
  createCourseVisisble = signal(false);
}
