import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { JuegoPropioComponent } from './juego-propio/juego-propio.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';

const routes: Routes = [
  { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'juego-propio', component: JuegoPropioComponent },
    { path: 'mayor-menor', component: MayorMenorComponent },
    { path: 'preguntados', component: PreguntadosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
