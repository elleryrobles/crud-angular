import { Component, HostBinding, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Input, Ripple, initTE, } from "tw-elements";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";
import { ThemeService } from '../../services/theme.service';


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ThemeToggleComponent
    ]
})
export class LoginComponent {

  themeService = inject(ThemeService);
  userService = inject(UserService);
  router = inject(Router);
  fb = inject(FormBuilder);

  formulario: FormGroup;

  constructor() {
    this.formulario = this.fb.group({
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    initTE({ Input, Ripple });
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

  marcarCamposTocados() {
    this.formulario.markAllAsTouched();
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }
  
}
