import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
  },

  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./ahorcado/ahorcado.component').then((c) => c.AhorcadoComponent),
    canActivate: [AuthGuard],
  },

  {
    path: 'mayormenor',
    loadComponent: () =>
      import('./mayormenor/mayormenor.component').then(
        (c) => c.MayormenorComponent
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'preguntados',
    loadComponent: () =>
      import('./preguntados/preguntados.component').then(
        (c) => c.PreguntadosComponent
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'juegopropio',
    loadComponent: () =>
      import('./juegopropio/juegopropio.component').then(
        (c) => c.JuegopropioComponent
      ),
    canActivate: [AuthGuard],
  },
];
