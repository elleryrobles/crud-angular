import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8181/auth';

  postNuevo(formValue: any): Observable<any> {
    console.log(formValue);
    return this.httpClient.post<any>(`${this.baseUrl}/nuevo`, formValue)
    .pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        throw error;
      })
    );
  }

  postLogin(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, formValue);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/lista`);
  }
}
