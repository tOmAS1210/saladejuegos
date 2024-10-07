import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  correo: string = '';
  pass: string = '';
  nombre: string = '';

  constructor(private userService: UserService, private router: Router) {}

  bandera = 0;

  crearUsuario() {
    this.userService
      .register(this.correo, this.pass, this.nombre)
      .then((response) => {
        console.log(response);
        this.userService.isAuthenticated = true;
        Swal.fire({
          title: 'Good job!',
          text: 'Registro y login exitoso',
          icon: 'success',
          position: 'top',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          background: '#f8d7da',
          customClass: {
            popup: 'my-custom-popup',
          },
        });
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.bandera = 1;
        this.alertCampos(error);
        console.log(error);
      });
  }

  alertCampos(error: any) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (this.pass.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique la validez de su contrasenia',
        position: 'top',
        toast: true,
        showConfirmButton: true,
        background: '#f8d7da',
        customClass: {
          popup: 'my-custom-popup',
        },
      });
    } else if (!emailPattern.test(this.correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique la validez de su correo',
        position: 'top',
        toast: true,
        showConfirmButton: true,
        background: '#f8d7da',
        customClass: {
          popup: 'my-custom-popup',
        },
      });
    } else if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que este correo ya esta registrado en la pagina',
        position: 'top',
        toast: true,
        showConfirmButton: true,
        background: '#f8d7da',
        customClass: {
          popup: 'my-custom-popup',
        },
      });
    }
  }

  volverHome() {
    this.router.navigateByUrl('/home');
  }
}
