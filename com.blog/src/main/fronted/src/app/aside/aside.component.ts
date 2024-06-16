import { Component, EventEmitter, Output } from '@angular/core';
import { Publicacion } from '../model/publicacion';
import { PublicacionService } from '../services/publicacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  @Output() categoriaSeleccionada = new EventEmitter<string>();

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada.emit(categoria);
  }

  quitarFiltro(): void {
    this.categoriaSeleccionada.emit('');
  }
}
