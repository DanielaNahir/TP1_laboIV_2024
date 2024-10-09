import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertJuegoService {

  constructor() { }

  mostrarDerrota(texto:string, confirmar: () => void, cancelar: () => void): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "¡Perdiste!",
      text:"¿Quieres volver a intentarlo?" + texto,
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
        confirmar();
      } else {
        cancelar();
      }
    });
  }

  mostrarVictoria(texto: string, confirmar: () => void, cancelar: () => void): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "¡Ganaste!",
      text: texto,
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
        confirmar();
      } else {
        cancelar();
      }
    });
  }

  terminarJuego(texto: string, confirmar: () => void, cancelar: () => void): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
        icon: "question"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "¿Deseas salir del juego?",
      text: 'Si sales no podras seguir aumentando tu record' + texto,
      confirmButtonText: "seguir jugando",
      cancelButtonText: "Salir",
      showCancelButton: true,
      backdrop: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmar();
      } else {
        cancelar();
      }
    });
  }
}
