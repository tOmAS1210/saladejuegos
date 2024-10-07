import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Comida } from './comida';
import { Serpiente } from './serpiente';
import { cuadriculaExterior } from './gameboard-grid.util';

@Component({
  selector: 'app-juegopropio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './juegopropio.component.html',
  styleUrl: './juegopropio.component.css',
})
export class JuegopropioComponent implements OnInit, AfterViewInit {
  user: any;
  title = 'ViboritaElJuego';
  tableroJuego: any;
  serpiente = new Serpiente();
  comida = new Comida(this.serpiente);

  lastRenderTime = 0;
  gameOver = false;

  constructor(private userService: UserService, private router: Router) {}

  ngAfterViewInit() {
    this.tableroJuego = document.querySelector('.tableroJuego');
    if (!this.tableroJuego) {
      console.log('No se encontro el elemento tableroJuego');
      return;
    }
    window.requestAnimationFrame(this.start.bind(this));
  }

  ngOnInit(): void {
    this.user = this.userService.getUsuarioActual();
    this.serpiente.listenToInputs();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      event.preventDefault();
      this.movimientoDPad(event.key);
    }
  }

  movimientoDPad(direccion: string) {
    this.serpiente.input.setDirection(direccion);
  }

  start(currentTime: any) {
    if (this.gameOver) {
      return console.log('GAME OVER!!!!!!!!');
    }

    window.requestAnimationFrame(this.start.bind(this));
    const segundosDesdeLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (segundosDesdeLastRender < 1 / this.snakeSpeed) {
      return;
    }
    this.lastRenderTime = currentTime;

    this.update();
    this.dibujar();
  }

  update() {
    this.serpiente.update();
    this.comida.update();
    this.verificarMuerte();
  }

  dibujar() {
    this.tableroJuego.innerHTML = '';
    this.serpiente.dibujar(this.tableroJuego);
    this.comida.dibujar(this.tableroJuego);
  }

  verificarMuerte() {
    this.gameOver =
      cuadriculaExterior(this.serpiente.getCabezaSerpiente()) ||
      this.serpiente.interseccionSerpiente();
    if (!this.gameOver) {
      return;
    }

    this.tableroJuego.classList.add('blur');
  }

  get snakeSpeed() {
    const puntaje = this.comida.puntajeActual;
    if (puntaje < 10) {
      return 6;
    }
    if (puntaje > 10 && puntaje < 15) {
      return 7;
    }

    if (puntaje > 15 && puntaje < 20) {
      return 8;
    }

    return 9;
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

  moveToChat() {
    this.router.navigateByUrl('/chat');
  }
}
