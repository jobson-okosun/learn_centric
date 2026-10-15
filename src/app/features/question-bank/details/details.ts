import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html',
})
export default class Details {}
 