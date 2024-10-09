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
      text: texto,
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
      text: '¿Quieres volver a intentarlo?' + texto,
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
}
