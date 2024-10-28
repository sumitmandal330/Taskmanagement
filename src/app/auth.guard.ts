import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TaskService } from './task.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(TaskService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/app-login']);
    return false;
  }
};
