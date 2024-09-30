import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  ngOnInit() {}

  correo: string = '';
  pass: string = '';
  nombre: string = '';
  bandera = 0;
  constructor(private userService: UserService, private router: Router) {}

  loguearUsuario() {
    this.userService
      .login(this.correo, this.pass)
      .then((response) => {
        console.log(response);
        this.userService.isAuthenticated = true;
        this.router.navigate(['/home']);
        Swal.fire({
          title: 'Good job!',
          text: 'Logueo exitoso',
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
      })
      .catch((error) => {
        this.bandera = 1;
        this.alertCampos();
        console.log('logueo fallido: ', error);
      });
  }

  alertCampos() {
    if (this.bandera === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique su correo o contrasenia',
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
    this.router.navigate(['/home']);
  }

  autoCompletarAdmin() {
    this.correo = 'admin@gmail.com';
    this.pass = '123456';
    //.nombre = 'Admin';
  }

  autoCompletarUser1() {
    this.correo = 'user1@gmail.com';
    this.pass = '123456';
    //this.nombre = 'Usuario Comun';
  }

  autoCompletarUser2() {
    this.correo = 'user2@gmail.com';
    this.pass = '123456';
    //this.nombre = 'Usuario Comun 2';
  }
}
