import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { Publicacion } from '../model/publicacion';
import { PublicacionService } from '../services/publicacion.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, RouterLink, RouterLinkActive, PostComponent]
})
export class HomeComponent implements OnInit {
  publicaciones: Publicacion[] = [];

  constructor(private publicacionService: PublicacionService) { }

  ngOnInit(): void {
    this.publicacionService.getAll().subscribe(
      (data: Publicacion[]) => {
        this.publicaciones = data.slice(0, 3);
      },
      (error: any) => {
        console.error('Error al obtener las publicaciones:', error);
      }
    );
  }
}
