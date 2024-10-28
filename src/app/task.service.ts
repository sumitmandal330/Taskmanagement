import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private storageKey = 'tasks'; // Key for storing tasks in local storage
  private notificationKey = 'notifications'; // Key for notification count in local storage

  private tasksSubject = new BehaviorSubject<any[]>(this.getTasks()); // Create a BehaviorSubject for tasks
  tasks$ = this.tasksSubject.asObservable(); // Observable for tasks

  constructor() {
    if (!this.getTasks()) {
      this.setTasks([]); // Initialize with an empty array if not already set
    }
    if (!this.getNotificationCount()) {
      this.setNotificationCount(0); // Initialize notification count
    }
  }

  getTasks(): any[] {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  setTasks(tasks: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    this.tasksSubject.next(tasks); // Emit new tasks list
  }

  addTask(task: any): void {
    const tasks = this.getTasks();
    const currentTime = new Date().toLocaleString(); // Capture current date and time
    const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' }); // Get day of the week
    tasks.push({ ...task, submissionTime: currentTime, dayOfWeek }); // Add submission time and day of the week to task
    this.setTasks(tasks);
    this.incrementNotificationCount(); // Increment notification count on task creation
  }

  deleteTask(index: number): void {
    const tasks = this.getTasks();
    tasks.splice(index, 1);
    this.setTasks(tasks);
  }

  editTask(index: number, updatedTask: any): void {
    const tasks = this.getTasks();
    tasks[index] = updatedTask;
    this.setTasks(tasks);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('userToken');
    return !!token;
  }

  // Notification management
  getNotificationCount(): number {
    const count = localStorage.getItem(this.notificationKey);
    return count ? JSON.parse(count) : 0;
  }

  setNotificationCount(count: number): void {
    localStorage.setItem(this.notificationKey, JSON.stringify(count));
  }

  incrementNotificationCount(): void {
    const currentCount = this.getNotificationCount();
    this.setNotificationCount(currentCount + 1); // Increase the count by 1
  }

  resetNotificationCount(): void {
    this.setNotificationCount(0); // Reset the count
  }

  // Method to filter tasks based on status, priority, category, and day of the week
  filterTasks(status: string, priority: string, category: string, day: string): any[] {
    let tasks = this.getTasks();

    // Apply filtering based on the provided criteria
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (priority) {
      tasks = tasks.filter(task => task.priority === priority);
    }
    if (category) {
      tasks = tasks.filter(task => task.category === category);
    }
    if (day && day !== 'Weekly') {
      tasks = tasks.filter(task => task.dayOfWeek === day);
    }

    return tasks;
  }
}
