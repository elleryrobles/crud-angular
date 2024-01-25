import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {

    let clonedRequest = request;

    if (localStorage.getItem('token_crud')) {
      clonedRequest = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('token_crud')!
        }
      });
    }

    return next.handle(clonedRequest);
  }
}
