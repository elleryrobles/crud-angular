import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService) {
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
