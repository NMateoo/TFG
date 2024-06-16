import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publicacion } from '../model/publicacion';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private api = 'http://localhost:8080/publicaciones/';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Publicacion[]> {
    return this.httpClient.get<Publicacion[]>(this.api)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error al obtener las publicaciones. Por favor, intenta nuevamente más tarde.';
          return throwError(errorMessage);
        })
      );
  }

  getByCategoria(categoria: string): Observable<Publicacion[]> {
    return this.httpClient.get<Publicacion[]>(`${this.api}categoria/${categoria}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error al obtener las publicaciones por categoría. Por favor, intenta nuevamente más tarde.';
          return throwError(errorMessage);
        })
      );
  }

  create(publicacion: Publicacion, token: string): Observable<Publicacion> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.httpClient.post<Publicacion>(this.api, publicacion, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error al crear la publicación. Por favor, intenta nuevamente más tarde.';
          if (error.error && error.error.message && error.error.message.includes('Duplicate entry')) {
            errorMessage = 'El nombre de usuario ya está en uso. Por favor, elige otro.';
          }
          return throwError(errorMessage);
        })
      );
  }

  getMyPosts(autor: String, token: String): Observable<Publicacion[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.httpClient.get<Publicacion[]>(`${this.api}autor/${autor}`, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error al obtener las publicaciones del usuario. Por favor, intenta nuevamente más tarde.';
          return throwError(errorMessage);
        })
      );
  }

  getById(id: number): Observable<Publicacion> {
    return this.httpClient.get<Publicacion>(`${this.api}${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error al obtener la publicación. Por favor, intenta nuevamente más tarde.';
          return throwError(errorMessage);
        })
      );
  }

  edit(id: number, publicacion: Publicacion, token: string): Observable<Publicacion> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.httpClient.put<Publicacion>(`${this.api}${id}`, publicacion, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error al editar la publicación. Por favor, intenta nuevamente más tarde.';
          return throwError(errorMessage);
        })
      );
  }

  delete(id: number, token: string): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.httpClient.delete<void>(`${this.api}${id}`, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error al eliminar la publicación. Por favor, intenta nuevamente más tarde.';
          return throwError(errorMessage);
        })
      );
  }

}

