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
          position: 'top',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          background: '#f8d7da',
          customClass: {
            popup: 'my-custom-popup',
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
        position: 'top',
        toast: true,
        showConfirmButton: true,
        ///timer: 3000,
        background: '#f8d7da',
        customClass: {
          popup: 'my-custom-popup',
        },
      });
    }
  }

  volverHome() {
    this.router.navigate(['/home']);
  }

  autoCompletarAdmin() {
    this.correo = 'admin@gmail.com';
    this.pass = '123456';
  }

  autoCompletarUser1() {
    this.correo = 'user1@gmail.com';
    this.pass = '123456';
  }

  autoCompletarUser2() {
    this.correo = 'user2@gmail.com';
    this.pass = '123456';
  }
}
