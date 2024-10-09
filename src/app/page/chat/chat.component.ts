import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { Mensaje } from '../../classes/mensaje';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  protected firestore = inject(DatabaseService);
  protected authService = inject(AuthService);
  protected mensajes: Mensaje[] = [];
  subscribe: Subscription | null = null;
  protected msjNuevo = "";

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    const mensajes = this.firestore.cargarMensajes();

    this.subscribe = mensajes.subscribe((result) => {
      console.log(result);
      this.mensajes = result as Mensaje[];
      setTimeout(() => this.scrollToBottom(), 100); // Aseguramos el scroll después de que el DOM se actualice
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
            fecha: this.formatDate(new Date)
          };

          this.firestore.guardarMensaje(nuevoMensaje).then(() => {
            console.log("Mensaje enviado correctamente");
            this.msjNuevo = "";
            setTimeout(() => this.scrollToBottom(), 100);
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

  scrollToBottom() {
    const msgContainer = document.getElementById('msgContainer');
    if (msgContainer) {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yy HH:mm:ss') || '';
  }
  

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }
}
