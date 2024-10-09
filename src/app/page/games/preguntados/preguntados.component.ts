import { Component, inject } from '@angular/core';
import { ApiRecuestService } from '../../../services/api-recuest.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AlertJuegoService } from '../../../services/alert-juegos.service';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  apiService = inject(ApiRecuestService);
  authService = inject(AuthService);
  alertService = inject(AlertJuegoService);
  nombrePokemon = "";
  pokemonId = "";
  imgPokemonBack = "";
  imgPokemonFront = "";
  vueltaPokemon = false;
  listaOpciones: string[] = [];
  user = this.authService.usuario;
  score = 0;

  constructor(private router: Router){}

  ngOnInit() {
    this.loop();
  }

  loop(){
    this.listaOpciones = [];
    this.imgPokemonBack = "";
    this.obtenerPokemonRandom();
    this.agregarOpciones();
    this.vueltaPokemon = false
  }

  obtenerPokemonRandom(){
    this.apiService.traerPokemonAlAzar().subscribe((pokemon) => {

      this.nombrePokemon = pokemon.name.toUpperCase();
      this.listaOpciones.push(pokemon.name.toUpperCase());
      this.pokemonId = pokemon.id
      this.imgPokemonBack = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+
      pokemon.order + ".png";
      //this.imgPokemonFront = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+
      //pokemon.order + ".png";
      this.imgPokemonFront = pokemon.sprites.other.showdown.front_default
      this.imgPokemonBack = pokemon.sprites.other.showdown.back_default

      console.log("nombre: "+ this.nombrePokemon);
      console.log(this.imgPokemonBack);
      console.log(this.imgPokemonFront);
    });
  }
  
  clickPokemon(opcionElegida:string){
    this.vueltaPokemon = true
    if(opcionElegida == this.nombrePokemon){
      this.score += 17;
      setTimeout(() => this.loop(), 1500);
    } else {
      
      this.alertService.mostrarDerrota(" El pokemon es " + this.nombrePokemon, () => {
        this.loop(),
        this.score = 0;
      }, () => {
        this.salir()
      });
    }
  }

  generarOpcionAleatoria(){
    const pokemonId = Math.floor(Math.random() * 898) + 1;
    if(this.pokemonId != pokemonId.toString()){
      return this.apiService.traerPokemon(pokemonId.toString())
    } else {
      const pokemonId2 = Math.floor(Math.random() * 898) + 1;
      return this.apiService.traerPokemon(pokemonId2.toString())
    }
    
  }

  agregarOpciones(){
    for (let index = 0; index < 3; index++) {
      this.generarOpcionAleatoria().subscribe((opcion) => {
        this.listaOpciones.push(opcion.name.toUpperCase())
      });
    }
    this.listaOpciones.sort(() => Math.random() - 0.5);
    console.log(this.listaOpciones);
  }

  terminarJuego(){
    if (this.score > 0) {
        this.alertService.terminarJuego("", () => {}, () => {
        this.salir();
      });
    } else {
      this.salir();
    }
    
  }

  salir() {
    this.router.navigate(['/home']);
  }
}
