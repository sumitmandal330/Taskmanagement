import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { SidenavbarComponent } from '../sidenavbar/sidenavbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule,SidenavbarComponent,RouterOutlet,RouterLink],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  taskNotifications: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskNotifications = this.taskService.getTasks().map(task => ({
      ...task,
      submissionTime: task.submissionTime || 'No time available',
    }));
  }
}
