import { Component } from '@angular/core';
import { and } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

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

  constructor(private router: Router) {}

  obtenerPalabraAleatoria(): string {
    const randomIndex = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[randomIndex];
  }

  clickTeclas(letra:string) {
    this.teclasUsadas.push(letra);

    if (this.palabra.includes(letra)) {
      this.letrasDescubiertas.push(letra);
      if (this.letrasDescubiertas.length === new Set(this.palabra.split('')).size) {
        this.mostrarVictoria();
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

  finalizarJuego(){
    const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "¡Perdiste!",
          text: '¿Quieres volver a intentarlo? la palabra era "'+this.palabra+'"',
          showCancelButton: true,
          confirmButtonText: "Sí, reiniciar",
          cancelButtonText: "No, salir",
          reverseButtons: true,
          backdrop: true,
          allowOutsideClick: false,
          imageUrl: 'perdiste.png',
          imageWidth: 100,
          imageHeight: 100,
        }).then((result) => {
          if (result.isConfirmed) {
            this.reiniciarJuego();
          } else{
            this.salir();
          }
        });
  }

  verificarVictoria() {
    const todasLasLetrasDescubiertas = [...new Set(this.palabra.split(''))].every(letra => this.letrasDescubiertas.includes(letra));

    if (todasLasLetrasDescubiertas) {
      this.mostrarVictoria();
    }
  }

  mostrarVictoria(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¡Ganaste!",
      text: '¡Felicidades! Has adivinado la palabra "' + this.palabra + '"',
      confirmButtonText: "Volver a jugar",
      cancelButtonText: "Salir",
      showCancelButton: true, 
      backdrop: true,
      allowOutsideClick: false,
      imageUrl: 'ganar.png',
      imageWidth: 100,
      imageHeight: 100,
    }).then((result) => {
      if (result.isConfirmed) {
        this.reiniciarJuego();
      } else {
        this.salir();
      }
    });
  
  }

  salir() {
    this.router.navigate(['/home']);
    this.reiniciarJuego();
  }

}
