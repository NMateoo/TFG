import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = "http://localhost:8080/api/v1/";
  private apiRegister = "http://localhost:8080/auth/register";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getUser(username:String): Observable<User> {
    return this.httpClient.get<User>(this.api+"user/"+username)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiRegister, user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error) {
            return throwError('El nombre de usuario ya está en uso. Por favor, elige otro.');
          } else {
            return throwError('Error al crear el usuario. Por favor, intenta nuevamente más tarde.');
          }
        })
      );
  }

  find(id: number): Observable<User> {
    return this.httpClient.get<User>(this.api + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateUser(username: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.api}user/${username}`, user, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id: number){
    return this.httpClient.delete<User>(this.api + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }
}
