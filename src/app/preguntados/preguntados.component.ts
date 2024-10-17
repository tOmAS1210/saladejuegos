import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PreguntadosApiService } from '../services/preguntados-api.service';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
})
export class PreguntadosComponent {
  user: any;

  preguntas: any[] = [];
  indicePreguntaActual = 0;
  preguntaActual: any;
  puntaje = 0;
  cantidadRespondida = 0;
  mensaje: string = '';
  temaSeleccionado = '';

  banderaTema = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private preguntadosService: PreguntadosApiService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUsuarioActual();
  }

  TraerPreguntasTema(tema: string) {
    this.temaSeleccionado = tema;
    this.banderaTema = 1;

    if (this.temaSeleccionado == 'Conocimiento General') {
      this.preguntadosService.getPreguntasGeneral().subscribe((data) => {
        if (data) {
          this.preguntas = data;
          this.preguntaActual = this.preguntas[this.indicePreguntaActual];
        } else {
          console.log('ERROR');
        }
      });
    } else if (this.temaSeleccionado == 'Entretenimiento') {
      this.preguntadosService
        .getPreguntasEntretenimiento()
        .subscribe((data) => {
          if (data) {
            this.preguntas = data;
            this.preguntaActual = this.preguntas[this.indicePreguntaActual];
          } else {
            console.log('ERROR');
          }
        });
    } else if (this.temaSeleccionado == 'Juegos') {
      this.preguntadosService.getPreguntasJuegos().subscribe((data) => {
        if (data) {
          this.preguntas = data;
          this.preguntaActual = this.preguntas[this.indicePreguntaActual];
        } else {
          console.log('ERROR');
        }
      });
    }
  }

  verificarRespuesta(opcionElegida: string) {
    if (opcionElegida === this.preguntaActual.respuesta_correcta) {
      this.cantidadRespondida += 1;
      this.puntaje += 50;
      //this.mensaje = 'CORRECTO';
      Swal.fire({
        text: 'Respuesta Correcta',
        timer: 2000,
        showConfirmButton: false,
        background: '#008000',
        color: '#FFFFFF',
      });

      if (this.cantidadRespondida === 10) {
        Swal.fire({
          title: 'FELICIDADES!!!',
          text: 'LOGRASTE RESPONDER TODAS LAS PREGUNTAS. +1000 PUNTOS',
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
        this.puntaje += 1000;
      }
    } else {
      Swal.fire({
        text: `Respuesta Incorrecta, la respuesta era: ${this.preguntaActual.respuesta_correcta}`,
        timer: 2000,
        showConfirmButton: false,
        background: '#ee4825',
        color: '#FFFFFF',
      });
      // this.mensaje =
      //   'INCORRECTO. La respuesta correcta es: ' +
      //   this.preguntaActual.respuesta_correcta;
    }

    setTimeout(() => {
      this.siguientePregunta();
    }, 1000);
  }

  siguientePregunta() {
    this.indicePreguntaActual++;
    if (this.indicePreguntaActual <= 9) {
      this.preguntaActual = this.preguntas[this.indicePreguntaActual];
      this.mensaje = '';
    } else {
      if (this.cantidadRespondida < 10) {
        Swal.fire({
          text: `Juego terminado, lograste ${this.puntaje} Puntos respondiendo ${this.cantidadRespondida} preguntas correctas`,
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
      }
    }
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

  moveToChat() {
    this.router.navigateByUrl('/chat');
  }
}
