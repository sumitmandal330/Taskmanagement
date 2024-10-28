import { Component } from '@angular/core';
import { CenterbarComponent } from '../centerbar/centerbar.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { SidenavbarComponent } from '../sidenavbar/sidenavbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,SidenavbarComponent,CenterbarComponent,SidebarComponent,CalendarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
