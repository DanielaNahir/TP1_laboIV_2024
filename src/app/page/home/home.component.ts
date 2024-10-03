import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  user: User | null = null;
  private router = inject(Router);
  authServise = inject(AuthService);
  
  constructor(private auth: Auth) {}

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      this.user = user;
    });
  }

}
