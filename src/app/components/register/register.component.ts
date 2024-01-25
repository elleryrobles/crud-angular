import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  router = inject(Router);
  userService = inject(UserService);

  mostrarAlerta: boolean = false;
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
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
      this.userService.postNuevo(this.formulario.value).subscribe(
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
