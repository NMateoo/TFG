import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { LoginService } from '../app/auth/login.service'
import { jwtDecode } from 'jwt-decode';
import { User } from './model/user';
import { UserService } from './services/user.service';
import { AsideComponent } from "./aside/aside.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, AsideComponent]
})

export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;
  user?: User;

  constructor(private loginService: LoginService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    initFlowbite();

    this.loginService.userLoginOn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        const token = sessionStorage.getItem('token');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          this.username = decodedToken.sub; 

          if (this.username) {
            this.userService.getUser(this.username).subscribe({
              next: (userData) => {
                this.user = userData;
              },
              error: (errorData) => {
                console.log("Error al obtener el usuario:", errorData);
              }
            });
          }
        }
      }
    });
  }

  navigateUser(): void {
    this.loginService.userLoginOn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        const token = sessionStorage.getItem('token');
        if (token) {
          console.log('lo tengo');
          const decodedToken: any = jwtDecode(token);
          const username = decodedToken.sub;
          this.router.navigate([`/user/${username}`]);
        } else {
          console.error('No se encontró el token en sessionStorage');
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  
}
