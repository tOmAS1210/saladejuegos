import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'quiensoy',
    loadComponent: () =>
      import('./quien-soy/quien-soy.component').then(
        (c) => c.QuienSoyComponent
      ),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },

  {
    path: 'registro',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent),
  },

  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat.component').then((c) => c.ChatComponent),
  },

  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./ahorcado/ahorcado.component').then((c) => c.AhorcadoComponent),
  },

  {
    path: 'mayormenor',
    loadComponent: () =>
      import('./mayormenor/mayormenor.component').then(
        (c) => c.MayormenorComponent
      ),
  },

  {
    path: 'preguntados',
    loadComponent: () =>
      import('./preguntados/preguntados.component').then(
        (c) => c.PreguntadosComponent
      ),
  },

  {
    path: 'juegopropio',
    loadComponent: () =>
      import('./juegopropio/juegopropio.component').then(
        (c) => c.JuegopropioComponent
      ),
  },
];
