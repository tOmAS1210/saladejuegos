import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  agregarUsuario(user: Usuario) {
    const colecUsuarios = this.firestore.collection('usuarios');
    const documento = colecUsuarios.doc();
    documento.ref.id;

    colecUsuarios.add({ ...user });
  }

  traerUsuarios() {
    const colecUsuarios = this.firestore.collection('usuarios');

    const observable = colecUsuarios.valueChanges();

    observable.subscribe((resultado) => {});
  }

  modificar(usuario: Usuario) {
    const colecUsuarios = this.firestore.collection('usuarios');
    const documento = colecUsuarios.doc(usuario.id);
    documento.update({ ...usuario });
  }

  eliminar(usuario: Usuario) {
    const colecUsuarios = this.firestore.collection('usuarios');
    const documento = colecUsuarios.doc(usuario.id);
    documento.delete();
  }
}
