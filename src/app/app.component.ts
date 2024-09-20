import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TP1';
  user: User | null = null;

  private router = inject(Router);
  constructor(private auth: Auth) {}

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      this.user = user;
    });
  }

  carrarSesion(){
    Swal.fire({
      title: "Estas seguro de cerrar sesion?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cerrar sesion"
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.signOut();
        Swal.fire({
          title: "Sesion cerrada",
          icon: "success"
        });
        this.router.navigateByUrl("/login");
      }
    });
  }
}
