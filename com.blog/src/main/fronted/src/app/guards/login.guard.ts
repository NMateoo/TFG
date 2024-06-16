import { inject } from "@angular/core";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { UserService } from "../services/user.service";
import { map } from "rxjs";

export const loginGuard = () => {

    const router = inject(Router);
    const userService = inject(UserService)
    const token = sessionStorage.getItem('token')

    if(token) {
        return true;
    } else {
        Swal.fire({
            title: 'Debes iniciar sesión',
            icon: 'warning',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if(result.isConfirmed){
              router.navigateByUrl('login').then();
            }
          });
        return false;
    }
}