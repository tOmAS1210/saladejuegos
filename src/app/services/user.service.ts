import { Injectable } from '@angular/core';
import {
  Auth,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject, single } from 'rxjs';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  setPersistence,
} from 'firebase/auth/cordova';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isAuthenticated: boolean = false;
  public usuarioLogueado: any = null;

  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
    this.setAuthPersistence();
    this.verificarAuthState();
  }

  private setAuthPersistence() {
    setPersistence(this.auth, browserLocalPersistence)
      .then(() => {
        console.log('Persistencia establecida');
      })
      .catch((error) => {
        console.error('Error al establecer la persistencia: ', error);
      });
  }

  private verificarAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.usuarioLogueado = user;
        this.isAuthenticated = true;
        console.log('usuario logueado: ', user);
      } else {
        this.usuarioLogueado = null;
        this.isAuthenticated = false;
        console.log('usuario deslogueado: ');
      }
    });
  }

  async verificarEmailExiste(email: string) {
    const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
    return signInMethods.length > 0;
  }

  async register(email: string, password: string, name: string) {
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
    // return this.auth.currentUser;
    return this.usuarioLogueado;
  }

  // private verificarEstadoAutenticacion() {
  //   onAuthStateChanged(this.auth, (user) => {
  //     if (user) {
  //       this.usuarioLogueado = user;
  //       console.log('User autenticado', user);
  //     } else {
  //       this.usuarioLogueado = null;
  //       console.log('No hay user autenticado');
  //     }
  //   });
  // }
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
