import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Mensaje } from '../../classes/mensaje';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  user: User | null = null;
  private router = inject(Router);
  authServise = inject(AuthService);
  protected firestore = inject(DatabaseService);
  chat = false;

  protected authService = inject(AuthService);
  protected mensajes: Mensaje[] = [];
  subscribe: Subscription | null = null;
  protected msjNuevo = "";
  
  constructor(private auth: Auth) {}

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }

}
