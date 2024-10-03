import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AlertJuegoService } from '../../../services/alert-juegos.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-juego-propio',
  standalone: true,
  imports: [],
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class JuegoPropioComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true }) canvas: ElementRef | undefined;
  canva: CanvasRenderingContext2D | null = null;
  snake: { x: number, y: number }[] = [];
  snakeSize = 20;
  fruta: { x: number, y: number } = { x: 0, y: 0 };
  dx = this.snakeSize;
  dy = 0;
  record = 0;
  gameInterval: any;
  isGameOver = false;

  //cabeza de la serpiente para cada dirección
  cabezaArriba: HTMLImageElement = new Image();
  cabezaAbajo: HTMLImageElement = new Image();
  cabezaIzq: HTMLImageElement = new Image(); 
  cabezaDer: HTMLImageElement = new Image();

  //comida
  frutaImg: HTMLImageElement = new Image();

  constructor(private alertService: AlertJuegoService, private router: Router,) { }

  ngOnInit(): void {
    if (this.canvas) {
      this.canva = this.canvas.nativeElement.getContext('2d');
      if (!this.canva) {
        console.error('canvas no se pudo obtener');
      }
    }

    this.cabezaArriba.src = '../../../../../assets/snake/cabezaA.png';
    this.cabezaAbajo.src = '../../../../../assets/snake/cabezaF.png';
    this.cabezaIzq.src = '../../../../../assets/snake/cabezaIz.png';
    this.cabezaDer.src = '../../../../../assets/snake/cabezaD.png';

    this.frutaImg.src = '../../../../../assets/snake/fruta.png';
  }

  iniciarJuego(): void {
    this.isGameOver = false;
    this.snake = [{ x: 100, y: 100 }];
    this.record = 0;
    this.dx = this.snakeSize;
    this.dy = 0;
    this.generarFruta();
    clearInterval(this.gameInterval);
    this.gameInterval = setInterval(() => this.loopJuego(), 100);
  }

  loopJuego(): void {
    if (this.isGameOver) {
      clearInterval(this.gameInterval);
      this.alertService.mostrarDerrota(() => {
        this.iniciarJuego();
      }, () => {
        this.salir();
      });
      return;
    }
  
    this.limpiarCanvas();
    this.moverSnake();
    this.checkColisiones();
    this.dibujarSnake();
    this.dibujarFruta();
    this.actualizarRecord();
  }
  
  salir() {
    this.router.navigate(['/home']);
  }

  limpiarCanvas(): void {
    if (this.canva && this.canvas) {
      this.canva.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
  }

  moverSnake(): void {
    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
    this.snake.unshift(head);

    if (head.x === this.fruta.x && head.y === this.fruta.y) {
      this.record+=15;
      this.generarFruta();
    } else {
      this.snake.pop();
    }
  }

  dibujarSnake(): void {
    if (this.canva != null && this.cabezaArriba.complete) {
      const head = this.snake[0];

      if (this.dy === -this.snakeSize) {  
        this.canva.drawImage(this.cabezaArriba, head.x, head.y, this.snakeSize, this.snakeSize);
      } else if (this.dy === this.snakeSize) {  
        this.canva.drawImage(this.cabezaAbajo, head.x, head.y, this.snakeSize, this.snakeSize);
      } else if (this.dx === -this.snakeSize) {  
        this.canva.drawImage(this.cabezaIzq, head.x, head.y, this.snakeSize, this.snakeSize);
      } else if (this.dx === this.snakeSize) { 
        this.canva.drawImage(this.cabezaDer, head.x, head.y, this.snakeSize, this.snakeSize);
      }

      this.canva.fillStyle = '#2aa98c';
      for (let i = 1; i < this.snake.length; i++) {
        const segment = this.snake[i];
        this.canva.fillRect(segment.x, segment.y, this.snakeSize, this.snakeSize);  // Dibujar un rectángulo para el cuerpo
      }
    }
  }

  generarFruta(): void {
    if (this.canvas && this.canvas.nativeElement) {
      const x = Math.floor(Math.random() * (this.canvas.nativeElement.width / this.snakeSize)) * this.snakeSize;
      const y = Math.floor(Math.random() * (this.canvas.nativeElement.height / this.snakeSize)) * this.snakeSize;
      this.fruta = { x, y };
    }
  }

  dibujarFruta(): void {
    if (this.canva && this.frutaImg) {
      this.canva.drawImage(this.frutaImg, this.fruta.x, this.fruta.y, this.snakeSize, this.snakeSize);
    }
  }

  actualizarRecord(): void {
    if (this.canva) {
      this.canva.fillStyle = 'black';
      this.canva.font = '16px Arial';
      this.canva.fillText(`Record: ${this.record}`, 10, 20);
    }
  }

  checkColisiones(): void {
    const head = this.snake[0];

    if (this.canvas && this.canva) {
      const canvasWidth = this.canvas.nativeElement.width;
      const canvasHeight = this.canvas.nativeElement.height;

      if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) {
        this.isGameOver = true;
        return;
      }

      for (let i = 1; i < this.snake.length; i++) {
        if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
          this.isGameOver = true;
          return;
        }
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        if (this.dy === 0) {
          this.dx = 0;
          this.dy = -this.snakeSize;
        }
        break;
      case 'ArrowDown':
        if (this.dy === 0) {
          this.dx = 0;
          this.dy = this.snakeSize;
        }
        break;
      case 'ArrowLeft':
        if (this.dx === 0) {
          this.dx = -this.snakeSize;
          this.dy = 0;
        }
        break;
      case 'ArrowRight':
        if (this.dx === 0) {
          this.dx = this.snakeSize;
          this.dy = 0;
        }
        break;
    }
  }
}
