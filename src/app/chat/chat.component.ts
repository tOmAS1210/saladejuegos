import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  usuarioLogueado: any;
  nuevoMensaje: string = '';
  mensajes: any = [
    {
      emisor: 'jixHZNpVgFVCJCg1jyKRRVHrGGj2',
      msj: 'hola que tal',
    },
    {
      emisor: 'id',
      msj: 'bien, como estas?',
    },
    {
      emisor: 'jixHZNpVgFVCJCg1jyKRRVHrGGj2',
      msj: 'seguis vendiendo esos consoladores monster cock?',
    },
    {
      emisor: 'id',
      msj: 'senior creo que se equivoco de numero',
    },
    {
      emisor: 'jixHZNpVgFVCJCg1jyKRRVHrGGj2',
      msj: 'Los negros cometen el 58% de los crimenes con solo ser 18% de la poblacion. (hay que eliminarlos)',
    },
  ];

  constructor(private userService: UserService, private auth: Auth) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Usuario autenticado:', user);
        this.usuarioLogueado = user.uid;
        console.log('UID: ', user.uid);
      } else {
        console.log('No hay un usuario autenticado.');
      }
    });
  }

  enviarMensaje() {
    console.log(this.nuevoMensaje);
    let mensaje = {
      emisor: this.usuarioLogueado,
      msj: this.nuevoMensaje,
    };
    this.mensajes.push(mensaje);

    this.nuevoMensaje = '';
    setTimeout(() => {
      this.scrollToTheLastElementByClassName();
    }, 30);
  }

  scrollToTheLastElementByClassName() {
    let elements = document.getElementsByClassName('msj');
    let ultimo: any = elements[elements.length - 1];
    let topPos = ultimo.offsetTop;

    const contenedorDeMensajes = document.getElementById(
      'contenedorDeMensajes'
    );
    if (contenedorDeMensajes) {
      contenedorDeMensajes.scrollTop = topPos;
    }
  }
}
