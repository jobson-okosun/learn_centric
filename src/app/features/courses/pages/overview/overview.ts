import { Component } from '@angular/core';
import { AddResourcesDropdown } from '../../components/add-resources-dropdown/add-resources-dropdown';
import { MaterialsList } from '../../components/materials-list/materials-list';

@Component({
  imports: [AddResourcesDropdown, MaterialsList],
  selector: 'app-overview',
  styleUrl: './overview.css',
  templateUrl: './overview.html',
})
export default class Overview {}
