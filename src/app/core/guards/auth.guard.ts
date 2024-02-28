import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('token_crud')) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
