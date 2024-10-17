import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  usuarioLogueado: any;
  nuevoMensaje: string = '';
  mensajes: any[] = [];

  firestore: Firestore = inject(Firestore);

  constructor(private userService: UserService, private auth: Auth) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Usuario autenticado:', user);
        this.usuarioLogueado = user;
        console.log('UID: ', user.uid);
      } else {
        console.log('No hay un usuario autenticado.');
      }
    });

    this.obtenerMensajes();
  }

  async obtenerMensajes() {
    try {
      const mensajesRef = collection(this.firestore, 'mensajes');
      const qery = query(mensajesRef, orderBy('timestamp', 'asc'));
      const querySnapshot = await getDocs(qery);

      //this.mensajes = querySnapshot.docs.map((doc) => doc.data());

      this.mensajes = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          timestamp: data['timestamp']?.toDate().toLocaleTimeString() || '',
        };
      });

      console.log('Mensajes recuperados: ', this.mensajes);
    } catch (error) {
      console.log('Error al obtener los mensajes: ', error);
    }
  }

  async enviarMensaje() {
    let mensaje = {
      emisor: this.usuarioLogueado.uid,
      msj: this.nuevoMensaje,
      email: this.usuarioLogueado.email,
      timestamp: new Date() as any,
    };

    try {
      const mensajesRef = collection(this.firestore, 'mensajes');
      await addDoc(mensajesRef, mensaje);

      mensaje.timestamp = mensaje.timestamp.toLocaleTimeString();

      this.mensajes.push(mensaje);

      this.nuevoMensaje = '';
      setTimeout(() => {
        this.scrollToTheLastElementByClassName();
      }, 30);
    } catch (error) {
      console.log('Error al enviar el mensaje: ', error);
    }
  }

  scrollToTheLastElementByClassName() {
    let elements = document.getElementsByClassName('mensaje');
    let ultimo: any = elements[elements.length - 1];
    let topPos = ultimo.offsetTop;

    const contenedorDeMensajes = document.getElementById(
      'contenedorDeMensajes'
    );
    if (contenedorDeMensajes) {
      contenedorDeMensajes.scrollTop = topPos;
    }
  }

  salirDelChat() {}
}
