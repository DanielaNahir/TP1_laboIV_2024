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

    const mensajes = this.firestore.cargarMensajes();

    this.subscribe = mensajes.subscribe((result) => {
      console.log(result);
      this.mensajes = result as Mensaje[];
    });
  }

  

  enviarMensaje() {
    if (this.msjNuevo.trim() !== "") {
      try {
        
        const user = this.authService.usuario;

        if (user) {
          const nuevoMensaje: Mensaje = {
            usuario: user.displayName || 'Usuario Anónimo',
            email: user.email || 'correo@anonimo.com',
            texto: this.msjNuevo,
            fecha: new Date().toISOString()  
          };

          this.firestore.guardarMensaje(nuevoMensaje).then(() => {
            console.log("Mensaje enviado correctamente");
            this.msjNuevo = "";
          }).catch((error) => {
            console.error("Error al enviar el mensaje:", error);
          });
        } else {
          console.log("No hay usuario logueado.");
        }
      } catch (error) {
        console.error("Error en el envío del mensaje:", error);
      }
    } else {
      console.log("El mensaje no puede estar vacío");
    }
  }

  clickChat(){
    this.chat = !this.chat;
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }

}
