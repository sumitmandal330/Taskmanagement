import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { CenterbarComponent } from './centerbar/centerbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,SidenavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Time-management';
  
}
