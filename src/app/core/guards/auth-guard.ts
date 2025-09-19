import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth/auth';

export const authGuard: CanActivateFn = (route, state) => {
  let auth = inject(Auth);
  let router = inject(Router);
  if (auth.userData.getValue() == null) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
