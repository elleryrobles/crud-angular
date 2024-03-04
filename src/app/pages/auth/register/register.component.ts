import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from '../../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ThemeToggleComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  themeService = inject(ThemeService);
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  roles: any = {
    1: 'Administrador',
    2: 'Usuario'
  };

  formulario: FormGroup;
  mostrarAlerta: boolean = false;

  constructor() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roles: this.fb.array([])
    });

    this.formulario = new FormGroup({
      nombre: new FormControl(),
      nombreUsuario: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      roles: this.fb.array([], Validators.required)
    })
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.authService.postNuevo(this.formulario.value).subscribe(
        response => {
          console.log('Usuario registrado con éxito:', response);
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }

  agregarRol(rol: number) {
    const rolesArray = this.formulario.get('roles') as FormArray;
    if (rolesArray.value.includes(rol)) {
      rolesArray.removeAt(rolesArray.value.indexOf(rol));
    } else {
      rolesArray.push(this.fb.control(rol));
    }
  }

  marcarCamposTocados() {
    this.formulario.markAllAsTouched();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  mostrarMensajeExito() {
    this.mostrarAlerta = true;
    setTimeout(() => {
      this.mostrarAlerta = false;
    }, 3000);
  }
}
