import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../auth/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username'];
      this.userService.getUser(username).subscribe({
        next: (userData) => {
          this.user = userData;
        },
        error: (errorData) => {
          console.log("Error al obtener el usuario:", errorData);
        }
      });
    });
  }

  logout() {
    Swal.fire({
      title: 'Vas a cerrar sesión. ¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.logout();
      }
    });

  }
}
