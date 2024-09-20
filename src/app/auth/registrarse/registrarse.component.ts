import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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
      createUserWithEmailAndPassword(this.auth, this.email, this.clave).then(() => {
        this.router.navigateByUrl("/home");
      })
      .catch((error) => {
        this.handleError(error);
        console.log("Error en la creación del usuario");
      });;
      
    
  }

  handleError(error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.error('El correo electrónico ya está en uso.');
      Swal.fire({
        icon: 'error',
        title: 'El correo electrónico ya está en uso',
        text: 'El correo electrónico que intentas usar ya está registrado. Por favor, pruebe con otro o inicie sesion.',
        heightAuto: false
      });
    } else {
      console.error('Error durante la creación del usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al intentar crear el usuario. Por favor, intenta nuevamente.',
        heightAuto: false
      });
    }
  }
}
