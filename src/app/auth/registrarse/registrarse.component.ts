import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Usuario } from '../../classes/usuario';


@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  usuario = new Usuario();
  authService = inject(AuthService);
  dbFirebase = inject(DatabaseService);

  private router = inject(Router);
  private auth = inject(Auth);

  async registro() {
    try {
      await this.dbFirebase.agregarUsuario(this.usuario);
      await this.authService.registro(
        this.usuario.email, 
        this.usuario.clave, 
        this.usuario.nombre,
        this.usuario.apellido
      );

      this.router.navigate(['/home']);
    } catch (error) {
      console.error("Error durante el registro:", error);
    }
  }
}

