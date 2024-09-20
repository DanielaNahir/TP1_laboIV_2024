import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  email = '';
  clave = '';

  private router = inject(Router);

  private auth = inject(Auth);
  registro() {
    createUserWithEmailAndPassword(this.auth, this.email, this.clave);
    this.router.navigateByUrl("/home");
  }
}
