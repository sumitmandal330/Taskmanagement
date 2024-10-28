import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../calendar/calendar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, CalendarComponent, FontAwesomeModule, RouterLink, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  currentDate: Date = new Date();
  showProfileDropdown: boolean = false;
  adminName: string = 'Sumit Kumar';
  adminEmail: string = 'sumitkumar@gmail.com';
  notificationCount: number = 0;

  constructor(private taskService: TaskService) {
    this.notificationCount = this.taskService.getNotificationCount();
  }

  // Toggles the profile dropdown
  toggleProfileDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  // Closes the profile dropdown if clicked outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const profileContainer = document.querySelector('.profile-container') as HTMLElement;
    if (profileContainer && !profileContainer.contains(event.target as Node)) {
      this.showProfileDropdown = false;
    }
  }

  // Resets the notification count when the notification button is clicked
  onNotificationClick(): void {
    this.taskService.resetNotificationCount();
    this.notificationCount = this.taskService.getNotificationCount(); 
  }
}
