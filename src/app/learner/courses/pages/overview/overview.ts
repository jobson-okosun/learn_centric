import { Component } from '@angular/core';
import { MaterialsList } from '../../components/materials-list/materials-list';

@Component({
  imports: [MaterialsList],
  selector: 'app-overview',
  styleUrl: './overview.css',
  templateUrl: './overview.html',
})
export default class Overview {}
