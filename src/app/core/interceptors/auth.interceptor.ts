import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let clonedReq = req;

  if (sessionStorage.getItem('token_crud')) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token_crud')!
      }
    });
  }

  return next(clonedReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        //console.log(err.error);
        sessionStorage.removeItem('token_crud');
        //inject(Router).navigate(['/login']);
      }
      //return throwError(() => new Error(err.error));
      return next(clonedReq);
    })
  );
};
