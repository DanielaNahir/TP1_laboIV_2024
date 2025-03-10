import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertJuegoService } from '../../../services/alert-juegos.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent {
  private cards: string[] = [
    '01-Trebol.png', '02-Trebol.png', '03-Trebol.png', '04-Trebol.png',
    '05-Trebol.png', '06-Trebol.png', '07-Trebol.png', '08-Trebol.png',
    '09-Trebol.png', '10-Trebol.png', '11-Trebol.png', '12-Trebol.png', '13-Trebol.png'
  ];
  currentCard: string = "";
  nextCard: string = "";
  resultMessage: string = "";
  score: number = 0;
  gameOver: number = 2;
  cardFlipped: boolean = false;

  constructor(private router: Router,  private alertService: AlertJuegoService) {
    this.loop();
  }

  loop() {
    if (this.score <= 0) {
      this.gameOver -=1;
      if(this.gameOver == 0){
        this.gameOver = 2;
        this.score = 0
        this.alertService.mostrarDerrota("",() =>{
          this.loop()
        }, () => {
          this.salir()
        })
      }
    }
    
    this.currentCard = this.obtenerCartaRamdom();
    this.nextCard = this.obtenerCartaRamdom();
    this.resultMessage = '';
    this.cardFlipped = false;  // Reiniciar el estado de la carta vuelta
  }

  private obtenerCartaRamdom(): string {
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards[randomIndex];
  }

  guess(esMayor: boolean) {
    const currentCardValue = this.cards.indexOf(this.currentCard) + 1;
    const nextCardValue = this.cards.indexOf(this.nextCard) + 1;
  
    // Se da vuelta la carta al hacer una elección
    this.cardFlipped = true;
  
    // Verificar si las cartas son iguales
    if (currentCardValue === nextCardValue) {
      this.resultMessage = '¡Las cartas son iguales!';
      this.score += 1; 
    }
    else if (esMayor == true && nextCardValue > currentCardValue) {
      this.score += 15;
      this.resultMessage = '¡Correcto!';
    } else if (esMayor == true && nextCardValue < currentCardValue){
      this.resultMessage = '¡Incorrecto!';
      this.score -= 10;
    } else if (esMayor == false && nextCardValue < currentCardValue){
      this.score += 15;
      this.resultMessage = '¡Correcto!';
    } else if (esMayor == false && nextCardValue > currentCardValue){
      this.resultMessage = '¡Incorrecto!';
      this.score -= 10;
    }
  
    setTimeout(() => this.loop(), 1500); 
  }

  terminarJuego() {
    if (this.score > 0) {
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
    this.router.navigate(['/home']);
    this.score = 0;
    this.gameOver = 2;
  }
}
