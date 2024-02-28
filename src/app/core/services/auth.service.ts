import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { JwtDto } from '../modelos/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  authUrl = 'http://localhost:8181/auth';

  postNuevo(formValue: any): Observable<any> {
    console.log(formValue);
    return this.httpClient.post<any>(`${this.authUrl}/nuevo`, formValue)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          throw error;
        })
      );
  }

  postLogin(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.authUrl}/login`, formValue);
  }

  refresh(dto: JwtDto): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(`${this.authUrl}/refresh`, dto);
  }

  isLogged(): boolean {
    return sessionStorage.getItem('token_crud') ? true : false;
  }
}
