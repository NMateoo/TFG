import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicacionService } from '../services/publicacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Publicacion } from '../model/publicacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {
  form: FormGroup;
  id: number;
  token: string | null;

  constructor (
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private router: Router,
    private route: ActivatedRoute) {

    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(10)]],
      comentario: ['', [Validators.required, Validators.minLength(20)]],
      imagen: []
    });

    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit(): void {
    this.publicacionService.getById(this.id).subscribe(
      (data: Publicacion) => {
        this.form.patchValue({
          titulo: data.titulo,
          comentario: data.comentario,
          imagen: data.imagen
        });
      },
      error => {
        console.error('Error al cargar la publicación', error);
      }
    );
  }

  hasErrors(controlname: string, errorType: string) {
    const control = this.form.get(controlname);
    return control?.hasError(errorType) && control?.touched;
  }

  onSubmit() {
    if (this.form.valid && this.token) {
      const updatedPost: Publicacion = this.form.value;
      this.publicacionService.edit(this.id, updatedPost, this.token).subscribe(
        () => {
          Swal.fire({
            title: 'Publicación editada correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
          this.router.navigate(['/publicaciones']);
        },
        error => {
          console.error('Error al editar la publicación', error);
        }
      );
    }
  }
}
