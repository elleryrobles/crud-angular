import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

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
