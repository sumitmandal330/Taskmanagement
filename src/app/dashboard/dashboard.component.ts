import { Component } from '@angular/core';
import { CenterbarComponent } from '../centerbar/centerbar.component';
import { SidenavbarComponent } from '../sidenavbar/sidenavbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CenterbarComponent,SidenavbarComponent,RouterOutlet,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
