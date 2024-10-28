// src/app/login/login.component.ts
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Use styleUrls instead of styleUrl
})
export class LoginComponent {
  userObj: any = {
    userName: '',
    password: '',
  };

  router = inject(Router);

  onLogin() {
    if (this.userObj.userName === 'sumit' && this.userObj.password === '12345') {
      const token = this.generateToken(this.userObj.userName, this.userObj.password);
      localStorage.setItem('userToken', token);
      alert('Login Success');
      this.router.navigateByUrl('/app-layout');
    } else {
      alert('Wrong Credentials');
    }
  }

  private generateToken(username: string, password: string): string {
    return btoa(`${username}:${password}`);
  }
}
