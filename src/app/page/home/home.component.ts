import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Mensaje } from '../../classes/mensaje';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: User | null = null;
  private router = inject(Router);
  authServise = inject(AuthService);
  protected authService = inject(AuthService);

  constructor(private auth: Auth) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  clickJuegos(juego: string) {
    if (this.user != null) {
      switch (juego) {
        case 'mayor-menor':
          this.router.navigateByUrl("/games/mayor-menor");
          break;
        case 'snake':
          this.router.navigateByUrl("/games/snake");
          break;
        case 'preguntados':
          this.router.navigateByUrl("/games/preguntados");
          break;
        case 'ahorcado':
          this.router.navigateByUrl("/games/ahorcado");
          break;
      }
    } else {
      Swal.fire({
        title: 'Inicie sesion',
        text: 'Solo los usuarios registrados pueden acceder a los juegos',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  }
}