import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage: string = '';

    constructor(private fb: FormBuilder, public userService: UserService,
      private router: Router) {
      this.form = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        avatar: []
      });
    }

  guardar() {
    if (this.form.valid) {
      this.userService.create(this.form.value).subscribe(
        (response: any) => {
          console.log('Usuario creado exitosamente:', response);
          Swal.fire({
            title: 'Usuario creado exitosamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if(result.isConfirmed){
              this.router.navigateByUrl('login').then();
            }
          });
        },
        (error: any) => {
          console.error('Error al crear el usuario:', error);
          this.errorMessage = error;
          Swal.fire({
            title: 'Nombre de usuario duplicado',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Reintentar'
          });
          this.form.markAllAsTouched();
        }
      );
    } else {
      Swal.fire({
        title: 'Error al crear el usuario, revisa los datos',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Reintentar'
      });
      this.form.markAllAsTouched();
    }
  }

  hasErrors(controlname: string, errorType: string) {
    return this.form.get(controlname)?.hasError(errorType) 
    && this.form.get(controlname)?.touched;
  }
}
