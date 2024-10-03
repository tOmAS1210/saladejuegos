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
  palabras: string[] = [
    'perro',
    'gato',
    'elefante',
    'tigre',
    'leon',
    'delfin',
    'jirafa',
    'conejo',
    'cebra',
    'tortuga',
    'pizza',
    'hamburguesa',
    'pasta',
    'ensalada',
    'sushi',
    'helado',
    'chocolate',
    'manzana',
    'naranja',
    'platano',
    'argentina',
    'brasil',
    'canada',
    'francia',
    'japon',
    'alemania',
    'mexico',
    'australia',
    'india',
    'españa',
    'mesa',
    'silla',
    'telefono',
    'computadora',
    'libro',
    'reloj',
    'lampara',
    'cuchara',
    'cuchillo',
    'tenedor',
    'rojo',
    'azul',
    'verde',
    'amarillo',
    'naranja',
    'morado',
    'rosa',
    'negro',
    'blanco',
    'gris',
    'correr',
    'saltar',
    'nadar',
    'leer',
    'escribir',
    'hablar',
    'escuchar',
    'bailar',
    'cantar',
    'jugar',
    'playa',
    'montaña',
    'bosque',
    'ciudad',
    'campo',
    'desierto',
    'rio',
    'lago',
    'parque',
    'jardin',
    'medico',
    'ingeniero',
    'maestro',
    'arquitecto',
    'abogado',
    'artista',
    'cientifico',
    'musico',
    'escritor',
    'chef',
    'feliz',
    'triste',
    'alto',
    'bajo',
    'rapido',
    'lento',
    'bonito',
    'feo',
    'fuerte',
    'debil',
    'gracias',
    'bienvenido',
  ];
  palabraElegida!: string;
  lineas!: string;
  letrasAdivinadas: string[] = [];
  letrasErradas: string[] = [];
  intentosRestantes: number = 6;
  puntos: number = 0;
  letrasTocadas: string[] = [];
  letrasUnicas: string[] = [];

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
    this.elegirPalabraAleatoria();
  }

  moveToChat() {
    this.router.navigateByUrl('/chat');
  }

  elegirPalabraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
    this.palabraElegida = this.palabras[indiceAleatorio];

    this.letrasUnicas = Array.from(new Set(this.palabraElegida.split('')));

    this.lineas = '_ '.repeat(this.palabraElegida.length).trim();
    this.letrasAdivinadas = [];
    this.letrasErradas = [];
    this.letrasTocadas = [];
    this.intentosRestantes = 6;
  }

  adivinarLetra(letra: string) {
    if (
      this.letrasAdivinadas.includes(letra) ||
      this.intentosRestantes == 0 ||
      this.letrasErradas.includes(letra)
    ) {
      return;
    }

    if (this.palabraElegida.includes(letra)) {
      this.letrasAdivinadas.push(letra);
      this.puntos += 100;
      if (
        this.letrasUnicas.every((letraUnica) =>
          this.letrasAdivinadas.includes(letraUnica)
        )
      ) {
        setTimeout(() => {
          Swal.fire({
            title: 'FELICIDADES',
            text: 'PALABRA ADIVINADA',
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
          this.reiniciarJuego();
        }, 500);
      }
      this.letrasTocadas.push(letra);
      this.actualizarLineas();
    } else {
      this.intentosRestantes--;
      this.letrasTocadas.push(letra);
      this.letrasErradas.push(letra);
      this.puntos -= 25;
    }
  }

  actualizarLineas() {
    this.lineas = this.palabraElegida
      .split('')
      .map((letra) => (this.letrasAdivinadas.includes(letra) ? letra : '_'))
      .join(' ');
  }

  reiniciarJuego() {
    this.elegirPalabraAleatoria();
  }

  reiniciarJuegoPerdido() {
    this.elegirPalabraAleatoria();
    this.puntos = 0;
  }
}
