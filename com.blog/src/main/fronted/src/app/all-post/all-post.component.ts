import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../services/publicacion.service';
import { Publicacion } from '../model/publicacion';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostComponent } from "../post/post.component";
import { AsideComponent } from "../aside/aside.component";

@Component({
    selector: 'app-all-post',
    standalone: true,
    templateUrl: './all-post.component.html',
    styleUrl: './all-post.component.css',
    imports: [RouterLink, CommonModule, PostComponent, AsideComponent]
})
export class AllPostComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  likedPublicaciones: Set<number> = new Set();

  constructor(private publicacionService: PublicacionService) { }

  ngOnInit(): void {
    this.getPublicaciones();
  }

  getPublicaciones(): void {
    this.publicacionService.getAll().subscribe(
      (data: Publicacion[]) => {
        this.publicaciones = data;
      },
      (error: any) => {
        console.error('Error al obtener las publicaciones:', error);
      }
    );
  }

  filtrarPorCategoria(categoria: string): void {
    if (categoria === '') {
      this.getPublicaciones();
    } else {
      this.publicacionService.getByCategoria(categoria).subscribe(
        (data: Publicacion[]) => {
          this.publicaciones = data;
        },
        (error: any) => {
          console.error('Error al obtener las publicaciones por categoría:', error);
        }
      );
    }
  }
}