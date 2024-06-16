import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { LoginService } from '../auth/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  currentUser?: User;
  username?: string;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      avatar: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || undefined;
      if (this.username) {
        this.userService.getUser(this.username).subscribe(user => {
          this.currentUser = user;
        });
      }
    });
  }

  hasErrors(controlname: string, errorType: string) {
    const control = this.form.get(controlname);
    return control?.hasError(errorType) && control?.touched;
  }

  onSubmit() {
    if (this.form.valid && this.currentUser) {
      const updatedUser: User = {
        ...this.currentUser,
        ...this.form.value
      };

      this.userService.updateUser(this.currentUser.username, updatedUser).subscribe(
        (response) => {
          console.log('Usuario actualizado exitosamente', response);
        },
        (error) => {
          console.error('Error al actualizar el usuario', error);
        }
      );
    }
  }
}