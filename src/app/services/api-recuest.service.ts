import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRecuestService {
  htpp = inject(HttpClient);
  pokeApi = "https://pokeapi.co/api/v2/pokemon/";
  constructor() { }

  traerPokemones(){
    const peticion = this.htpp.get(this.pokeApi, {
      responseType: "json",
    });

    peticion.subscribe((resp) => {
      console.log(resp)
    })
    
  }

  traerPokemon(pokemonId: string): Observable<any>{
    const peticion = this.htpp.get(this.pokeApi + pokemonId, {
      responseType: "json",
    });

    return peticion;
  }


  traerPokemonAlAzar(): Observable<any>{
    const randomId = Math.floor(Math.random() * 802) + 1;

    const peticion = this.htpp.get(`${this.pokeApi}/${randomId}`, {
      responseType: "json",
    });

    return peticion;
  }
}
