import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  router = inject(Router);
  userService = inject(UserService);

  formulario: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nombreUsuario: new FormControl(),
      password: new FormControl(),
    })
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.userService.postLogin(this.formulario.value).subscribe(
        response => {
          localStorage.setItem('token_crud', response.token);
          this.router.navigate(['/user-list']);
        },
        error => {
          console.error('Error al loguear usuario:', error);
        }
      );
    }
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }
}
