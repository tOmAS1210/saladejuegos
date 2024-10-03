import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css',
})
export class MayormenorComponent {
  user: any;
  numeroSiguienteRandom: number = 0;
  numeroInicialRandom: number = 0;
  puntos: number = 0;

  constructor(private userService: UserService, private router: Router) {
    this.proximaCarta();
  }

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
      .catch((error) => console.log(error));
  }

  ngOnInit() {
    this.user = this.userService.getUsuarioActual();
  }

  moveToChat() {
    this.router.navigateByUrl('/chat');
  }

  cartasAlAzar() {
    return Math.floor(Math.random() * 12) + 1;
  }

  botonMayor() {
    this.numeroSiguienteRandom = this.cartasAlAzar();
    console.log('Carta actual:', this.numeroSiguienteRandom);
    console.log('Carta anterior:', this.numeroInicialRandom);

    if (this.numeroSiguienteRandom > this.numeroInicialRandom) {
      console.log(
        'La carta que salio es mayor a esta: ',
        this.numeroInicialRandom
      );
      this.puntos += 10;
    } else if (this.numeroSiguienteRandom < this.numeroInicialRandom) {
      Swal.fire(`lograste: ${this.puntos} puntos, intentelo de nuevo`);
      this.puntos = 0;
    } else {
      Swal.fire({
        icon: 'success',
        text: 'Salio la misma carta, no ganas ni pierdes puntos',
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'my-custom-popup',
        },
      });
    }
    this.numeroInicialRandom = this.numeroSiguienteRandom;
  }

  botonMenor() {
    this.numeroSiguienteRandom = this.cartasAlAzar();
    console.log('Carta actual:', this.numeroSiguienteRandom);
    console.log('Carta anterior:', this.numeroInicialRandom);

    if (this.numeroSiguienteRandom < this.numeroInicialRandom) {
      console.log('La carta que salió es menor a la anterior.');
      this.puntos += 10;
    } else if (this.numeroSiguienteRandom > this.numeroInicialRandom) {
      Swal.fire(`lograste: ${this.puntos} puntos, intentelo de nuevo`);
      this.puntos = 0;
    } else {
      Swal.fire({
        icon: 'success',
        text: 'Salio la misma carta, no ganas ni pierdes puntos',
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'my-custom-popup',
        },
      });
    }

    this.numeroInicialRandom = this.numeroSiguienteRandom;
  }

  proximaCarta() {
    this.numeroInicialRandom = this.cartasAlAzar();
  }
}
