import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidenavbarComponent } from '../sidenavbar/sidenavbar.component';

interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  category: string;
}

@Component({
  selector: 'app-show-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, SidenavbarComponent],
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  editedTask: Task = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    status: 'todo',
    category: 'work',
  };
  editedTaskIndex: number | null = null;
  isEditModalOpen: boolean = false; // Flag for modal visibility

  // Filter values
  filterStatus: string = '';
  filterPriority: string = '';
  filterCategory: string = '';
  filterDay: string = ''; // New filter for day

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks; // Initialize filteredTasks with all tasks
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(index);
    this.tasks = this.taskService.getTasks(); // Refresh task list after deletion
    this.applyFilters(); // Reapply filters after deletion
  }

  openEditModal(index: number, task: Task) {
    this.editedTaskIndex = index;
    this.editedTask = { ...task }; // Clone the task to avoid two-way binding issues
    this.isEditModalOpen = true; // Show the modal
  }

  updateTask() {
    if (this.editedTaskIndex !== null) {
      this.taskService.editTask(this.editedTaskIndex, this.editedTask); // Update the task in TaskService
      this.tasks = this.taskService.getTasks(); // Refresh the tasks list
      this.applyFilters(); // Reapply filters after updating task
      this.cancelEdit(); // Close the modal
    }
  }

  cancelEdit() {
    this.editedTaskIndex = null;
    this.isEditModalOpen = false; // Close the modal
    this.resetEditedTask(); // Reset editedTask to initial state
  }

  resetEditedTask() {
    this.editedTask = {
      title: '',
      description: '',
      dueDate: '',
      priority: 'low',
      status: 'todo',
      category: 'work',
    };
  }

  // Apply filters and update the filteredTasks array
  applyFilters() {
    this.filteredTasks = this.taskService.filterTasks(
      this.filterStatus,
      this.filterPriority,
      this.filterCategory,
      this.filterDay // Include day filter
    );
  }

  // Reset filters and show all tasks
  resetFilters() {
    this.filterStatus = '';
    this.filterPriority = '';
    this.filterCategory = '';
    this.filterDay = ''; // Reset the day filter
    this.filteredTasks = this.tasks; // Show all tasks
  }
}
