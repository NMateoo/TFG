import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LoginService } from '../auth/login.service';
import { LoginRequest } from '../auth/loginRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  registroExitoso: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  };

  ngOnInit(): void {
  }

  get email() {
    return this.form.get("username");
  }

  get password() {
    return this.form.get("password");
  }

  login() {
    if (this.form.valid) {
      this.loginService.login(this.form.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorMessage) => {
          console.error(errorMessage);
          Swal.fire({
            title: errorMessage + ', credenciales incorrectas',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Reintentar'
          });
          this.form.markAllAsTouched();
          this.form.reset();
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/inicio');
        }
      })
    } else {
      Swal.fire({
        title: 'Error al iniciar sesión, faltan datos',
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
    console.log(this.form.get(controlname)?.hasError(errorType));
  }
}