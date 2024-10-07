import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { single } from 'rxjs';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { fetchSignInMethodsForEmail } from 'firebase/auth/cordova';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isAuthenticated: boolean = false;

  constructor(private auth: Auth, private firestore: Firestore) {}

  async verificarEmailExiste(email: string) {
    const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
    return signInMethods.length > 0;
  }

  async register(email: string, password: string, name: string) {
    // const emailExiste = await this.verificarEmailExiste(email);

    // if (emailExiste) {
    //   throw new Error('El correo ya esta registrado');
    // }

    const userCredencial = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = userCredencial.user;

    await setDoc(doc(this.firestore, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      name: name,
    });

    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  getUsuarioActual() {
    return this.auth.currentUser;
  }
}

// const userCredencial = await signInWithEmailAndPassword(
//   this.auth,
//   email,
//   password
// );
// const user = userCredencial.user;

// const userDocRef = doc(this.firestore, 'users', user.uid);
// const userDoc = await getDoc(userDocRef);

// if (userDoc.exists()) {
//   const userData = userDoc.data();
//   const userName = userData['name'];

//   return {
//     email: user.email,
//     uid: user.uid,
//     name: userName,
//   };
// } else {
//   throw new Error('Usuario no encontrado');
// }
