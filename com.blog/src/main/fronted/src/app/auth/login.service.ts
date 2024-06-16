import { Injectable } from '@angular/core';
import  {  Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from './loginRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = "http://localhost:8080/";

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient, private router: Router) { 
    this.currentUserLoginOn.next(sessionStorage.getItem("token") != null);
    this.currentUserData.next(sessionStorage.getItem("token") || "");
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(this.api + "auth/login", credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError((error) => {
        let errorMessage = 'Error en el inicio de sesión';
        if (error.status === 400) {
          errorMessage = 'Credenciales incorrectas';
        }
        return throwError(errorMessage);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem("token");
    this.currentUserData.next("");
    this.currentUserLoginOn.next(false);
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}