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
    console.log('entra en este metodo');
    this.userService
      .register(this.correo, this.pass, this.nombre)
      .then((response) => {
        console.log(response);
        this.userService.isAuthenticated = true;
        Swal.fire({
          title: 'Good job!',
          text: 'Registro y login exitoso',
          icon: 'success',
          position: 'top', // Cambia la posición (top, center, bottom, etc.)
          toast: true, // Lo hace aparecer como una notificación
          showConfirmButton: false,
          timer: 3000, // Lo hace desaparecer automáticamente después de 3 segundos
          background: '#f8d7da', // Color de fondo para hacerlo más visible
          customClass: {
            popup: 'my-custom-popup', // Clase CSS personalizada
          },
        });
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.bandera = 1;
        this.alertCampos();
        console.log(error);
      });
  }

  alertCampos() {
    if (this.bandera === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique la validez de su correo o contrasenia',
        position: 'top', // Cambia la posición (top, center, bottom, etc.)
        toast: true, // Lo hace aparecer como una notificación
        showConfirmButton: true,
        ///timer: 3000, // Lo hace desaparecer automáticamente después de 3 segundos
        background: '#f8d7da', // Color de fondo para hacerlo más visible
        customClass: {
          popup: 'my-custom-popup',
        }, // Clase CSS personalizada
      });
    }
  }

  volverHome() {
    this.router.navigateByUrl('/home');
  }
}
