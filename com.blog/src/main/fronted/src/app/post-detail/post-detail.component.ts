import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../model/publicacion';
import { ActivatedRoute } from '@angular/router';
import { PublicacionService } from '../services/publicacion.service';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  publicacion?: Publicacion;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private publicacionService: PublicacionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const titulo = params['titulo'];
      this.loadPublicacion(titulo);
    });
  }

  loadPublicacion(titulo: string): void {
    this.publicacionService.getAll().subscribe(
      publicaciones => {
        this.publicacion = publicaciones.find(pub => pub.titulo === titulo);
        if (!this.publicacion) {
          this.errorMessage = 'Publicación no encontrada.';
        }
      },
      error => {
        this.errorMessage = error;
      }
    );
  }
}