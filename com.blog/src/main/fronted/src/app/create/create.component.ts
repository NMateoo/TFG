import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicacionService } from '../services/publicacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private publicacionService: PublicacionService, private router: Router) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(10)]],
      comentario: ['', [Validators.required, Validators.minLength(20)]],
      categoria: ['', [Validators.required]],
      imagen: []
    });
  }

  create() {
    if (this.form.valid) {
      console.log(this.form.value);
      const token = sessionStorage.getItem('token');
      if (token) {
        this.publicacionService.create(this.form.value, token).subscribe(
          (response: any) => {
            console.log('Publicación creada exitosamente:', response);
            this.router.navigateByUrl('/home');
          },
          (error: any) => {
            console.error('Error al crear la publicación:', error);
          }
        );
      } else {
        console.error('Token no encontrado');
      }
    } else {
      Swal.fire({
        title: 'A tu publicación le faltan datos',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Reintentar'
      });
      this.form.markAllAsTouched();
    }
  }

  hasErrors(controlname: string, errorType: string) {
    const control = this.form.get(controlname);
    return control?.hasError(errorType) && control?.touched;
  }
}
