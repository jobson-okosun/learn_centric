import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddResourcesDropdown } from '../../../components/add-resources-dropdown/add-resources-dropdown';

@Component({
  imports: [RouterLink, AddResourcesDropdown],
  selector: 'app-assignment',
  styleUrl: './assignment.css',
  templateUrl: './assignment.html',
})
export default class Assignment {
}