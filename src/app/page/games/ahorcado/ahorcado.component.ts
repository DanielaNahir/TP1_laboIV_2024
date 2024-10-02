import { Component } from '@angular/core';
import { and } from '@angular/fire/firestore';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  palabra = "abdce";
  teclas: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  teclasUsadas: string[] = [];
  primerError = false;
  cantErrores = 0;

  clickTeclas(letra:string){
    this.teclasUsadas.push(letra);
    if(this.cantErrores > 0 && this.cantErrores < 7){
      this.cantErrores++;
    } else if(this.cantErrores == 0){
      this.primerError = true;
      this.cantErrores++;
    }
  }
}
