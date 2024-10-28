import { Component, inject, Injectable } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.css'
})
export class SidenavbarComponent {

  router = inject(Router);
  @Injectable({
    providedIn: 'root'
  })

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigateByUrl('/app-login');
  }
}
