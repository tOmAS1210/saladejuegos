import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import {} from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: any;

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
  }

  moveToChat() {
    this.router.navigateByUrl('/chat');
  }
}
