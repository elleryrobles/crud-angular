import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8181/auth';

  constructor(private readonly http: HttpClient) {
  }

  postNuevo(formValue: any): Observable<any> {
    console.log(formValue);
    return this.http.post<any>(`${this.baseUrl}/nuevo`, formValue)
    .pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        throw error;
      })
    );
  }

  postLogin(formValue: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, formValue);
  }

  getUsers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token_crud')!
      })
    };
    return this.http.get<any>(`${this.baseUrl}/lista`, httpOptions);
  }
  
}
