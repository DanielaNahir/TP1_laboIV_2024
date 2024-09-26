import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TP1';

  private router = inject(Router);
  constructor(private auth: Auth) {}
  authService = inject(AuthService);

  carrarSesion(){
    this.authService.carrarSesion();
  }
}
