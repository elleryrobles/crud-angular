import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  let clonedReq = req;

  if (inject(UserService).isLogged()) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('token_crud')!
      }
    });
  }

  return next(clonedReq);
};
