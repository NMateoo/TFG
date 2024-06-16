import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicacionService } from '../services/publicacion.service';
import { Publicacion } from '../model/publicacion';
import { CommonModule } from '@angular/common';
import { LoginService } from '../auth/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() publicacion!: Publicacion;
  userLoggedIn: boolean = false;
  currentUser: string = "";

  constructor(private publicacionService: PublicacionService, private loginService: LoginService) {
    this.loginService.userLoginOn.subscribe((loggedIn) => {
      this.userLoggedIn = loggedIn;
    });

    this.loginService.userData.subscribe((userData) => {
      const tokenParts = userData.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        this.currentUser = payload.sub;
      }
    });
  }

  isCurrentUserAuthor(): boolean {
    return this.publicacion.autor === this.currentUser;
  }

  deletePost(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      Swal.fire({
        title: '¿Estás seguro de que deseas eliminar esta publicación?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.publicacionService.delete(this.publicacion.idPublicacion, token).subscribe({
            next: () => {
              Swal.fire({
                title: 'Publicación borrada correctamente',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if(result.isConfirmed) {
                  window.location.reload();
                }
              });
            },
            error: (error) => {
              Swal.fire({
                title: 'Error',
                text: error,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          });
        }
      });
    }
  }
}