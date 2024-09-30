import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  //usuarios: Usuario = [];

  agregarUsuario(user: Usuario) {
    const colecUsuarios = this.firestore.collection('usuarios');
    const documento = colecUsuarios.doc();
    documento.ref.id;
    //user.id = documento.ref.id; // id se agrega en la clase usuario creo

    //documento.set({ ...user });
    colecUsuarios.add({ ...user });
  }

  traerUsuarios() {
    const colecUsuarios = this.firestore.collection('usuarios');
    // const observable = colecUsuarios.get();

    // observable.subscribe((resultado) => {
    //   resultado.docs.forEach((documento) => {
    //     console.log(documento.data);
    //   });
    // });

    const observable = colecUsuarios.valueChanges();

    observable.subscribe((resultado) => {
      //this.usuarios = resultado as Usuario[];
    });
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
