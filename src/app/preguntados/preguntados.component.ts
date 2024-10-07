import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
})
export class PreguntadosComponent {
  user: any;

  indicePreguntaActual = 0;
  puntaje = 0;
  preguntas = [
    {
      pregunta: '¿Cuantas personas fueron abusadas por Diddy?',
      opciones: ['10', '30', '27', 'Incontables'],
      correcta: 'Incontables',
    },
    {
      pregunta: '¿Cuál es el río más largo del mundo?',
      opciones: ['Nilo', 'Amazonas', 'Yangtsé', 'Misisipi'],
      respuestaCorrecta: 'Amazonas',
    },
    {
      pregunta: '¿Quién pintó la Mona Lisa?',
      opciones: ['Van Gogh', 'Da Vinci', 'Picasso', 'Rembrandt'],
      respuestaCorrecta: 'Da Vinci',
    },
  ];
  totalPreguntas = this.preguntas.length;
  preguntaActual: any;
  mensaje: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user = this.userService.getUsuarioActual();
    this.preguntaActual = this.preguntas[this.indicePreguntaActual];
  }

  // mostrarPregunta() {
  //   const pregunta = this.preguntas[this.indicePreguntaActual];
  //   console.log(pregunta.pregunta);
  //   pregunta.opciones.forEach((opcion, index) => {
  //     console.log(`${index + 1}: ${opcion}`);
  //   });
  // }

  verificarRespuesta(opcionElegida: string) {
    if (opcionElegida === this.preguntaActual.correcta) {
      this.puntaje += 50;
      this.mensaje = 'CORRECTO';
    } else {
      this.mensaje =
        'INCORRECTO. La respuesta correcta es: ' + this.preguntaActual.correcta;
    }

    this.siguientePregunta();
  }

  siguientePregunta() {
    this.indicePreguntaActual++;
    if (this.indicePreguntaActual < this.totalPreguntas) {
      //this.mostrarPregunta();
      this.preguntaActual = this.preguntas[this.indicePreguntaActual];
      this.mensaje = '';
    } else {
      console.log(
        `Juego terminado. Puntaje Finla: ${this.puntaje}/${this.totalPreguntas}`
      );
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
