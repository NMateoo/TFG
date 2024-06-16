import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from '../model/publicacion';
import { PublicacionService } from '../services/publicacion.service';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-user-post',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './user-post.component.html',
  styleUrl: './user-post.component.css'
})
export class UserPostComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  errorMessage: string = '';
  usuario = ''

  constructor(private publicacionService: PublicacionService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loadUserPosts();
  }

  loadUserPosts(): void {
    const token = this.loginService.userToken;
    const usuario = this.loginService.currentUserData.value;
    if (token && usuario) {
      this.publicacionService.getMyPosts(usuario, token).subscribe({
        next: (data) => {
          this.publicaciones = data;
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    } else {
      this.errorMessage = 'Usuario no autenticado';
    }
  }
}