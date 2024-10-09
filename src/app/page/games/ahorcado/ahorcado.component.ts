import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertJuegoService } from '../../../services/alert-juegos.service';
@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  palabras: string[] = ["ahorcado", "programacion", "pizarron", "angular", "cocina", "desarrollador", "cuchara", "pan", "web", "html", "casco", "casita", "hospital", "firebase", "internet", "camara"];
  palabra: string = this.obtenerPalabraAleatoria();
  teclas: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  teclasUsadas: string[] = [];
  letrasDescubiertas: string[] = [];
  primerError = false;
  cantErrores = 0;
  record = 0;

  constructor(private router: Router, private alertService: AlertJuegoService) {}

  obtenerPalabraAleatoria(): string {
    const randomIndex = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[randomIndex];
  }

  clickTeclas(letra: string) {
    this.teclasUsadas.push(letra);

    if (this.palabra.includes(letra)) {
      this.letrasDescubiertas.push(letra);
      if (this.letrasDescubiertas.length === new Set(this.palabra.split('')).size) {
        this.record += 15;
        setTimeout(() => this.reiniciarJuego(), 1500);
      }
    } else {
      if (this.cantErrores > 0 && this.cantErrores < 7) {
        this.cantErrores++;
      } else if (this.cantErrores == 0) {
        this.primerError = true;
        this.cantErrores++;
      }

      if (this.cantErrores == 7) {
        this.finalizarJuego();
      }
    }
  }

  reiniciarJuego() {
    this.letrasDescubiertas = [];
    this.teclasUsadas = [];
    this.cantErrores = 0;
    this.primerError = false;
    this.palabra = this.obtenerPalabraAleatoria();
  }

  finalizarJuego() {
    this.alertService.mostrarDerrota("La palabra era " + this.palabra, () => {
      this.reiniciarJuego();
    }, () => {
      this.salir();
    });
  }

  mostrarVictoria() {
    this.alertService.mostrarVictoria('Tu record fue de ' + this.record, () => {
      this.reiniciarJuego();
    }, () => {
      this.salir();
    });
  }

  terminarJuego() {
    if (this.record > 0) {
      this.alertService.terminarJuego(
        '', () => {}, () => {
          this.salir();
        }
      );
    } else {
      this.salir();
    }
  }


  salir() {
    this.reiniciarJuego();
    this.record = 0;
    this.router.navigate(['/home']);
  }
}
