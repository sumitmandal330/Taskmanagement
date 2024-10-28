import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-centerbar',
  standalone: true,
  imports: [ChartComponent, CommonModule, FormsModule],
  templateUrl: './centerbar.component.html',
  styleUrls: ['./centerbar.component.css']
})
export class CenterbarComponent implements OnInit {
  toDoCount: number = 0;
  inProgressCount: number = 0;
  completedCount: number = 0; // Ensure this is correctly named and initialized
  selectedDay: string = 'Weekly'; // Default value for day filter
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.updateTaskCounts(); // Update counts on load
  }

  updateTaskCounts() {
    const tasks = this.taskService.filterTasks('', '', '', this.selectedDay);

    // Update the task counts based on status
    this.toDoCount = tasks.filter(task => task.status === 'todo').length;
    this.inProgressCount = tasks.filter(task => task.status === 'in-progress').length;
    this.completedCount = tasks.filter(task => task.status === 'completed').length;
  }

  // Method called when day filter is changed
  onDayChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDay = selectElement.value;
    this.updateTaskCounts(); // Update task counts when day is changed
  }
}
