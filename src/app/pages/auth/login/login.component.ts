import { Component, HostBinding, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Input, Ripple, initTE, } from "tw-elements";
import { ThemeService } from '../../../core/services/theme.service';
import { ThemeToggleComponent } from '../../../components/theme-toggle/theme-toggle.component';
import { AuthService } from '../../../core/services/auth.service';


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
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  formulario: FormGroup;
  alertEnable: boolean = false;
  alert: any;

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
      this.authService.postLogin(this.formulario.value).subscribe({
        next: (resp) => {
          sessionStorage.setItem('token_crud', resp.token);
          this.router.navigate(['/user-list']);
        },
        error: (err) => {
          this.alertEnable = true;
          this.alert = err.error;
          setTimeout(() => {
            this.alertEnable = false;
          }, 5000);
        }
      });
    }
  }

  marcarCamposTocados() {
    this.formulario.markAllAsTouched();
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }

}