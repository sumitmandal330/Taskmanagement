import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink,SidenavbarComponent],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      dueDate: ['', [Validators.required]],
      priority: ['low', [Validators.required]],
      status: ['todo', [Validators.required]],
      category: ['work', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);
      this.resetForm();
      this.router.navigate(['/app-show-task']);
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  resetForm() {
    this.taskForm.reset({
      title: '',
      description: '',
      dueDate: '',
      priority: 'low',
      status: 'todo',
      category: 'work',
    });
  }
}
