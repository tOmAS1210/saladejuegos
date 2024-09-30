import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
})
export class AhorcadoComponent {
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  isLoggedIn() {
    return this.userService.getAuthStatus();
  }

  onClick() {
    this.userService
      .logout()
      .then(() => {
        this.userService.isAuthenticated = false;
        this.router.navigate(['/login']);
        Swal.fire({
          title: 'Good job!',
          text: 'Deslogueo exitoso',
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
      .catch((error) => console.log(error));
  }

  ngOnInit() {
    this.user = this.userService.getUsuarioActual();
  }

  moveToChat() {
    this.router.navigateByUrl('/chat');
  }
}
