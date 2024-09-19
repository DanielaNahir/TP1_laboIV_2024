import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { Component } from '@angular/core';
import { HomeComponent } from './page/home/home.component';
import { QuienSoyComponent } from './page/quien-soy/quien-soy.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo: "home",
        pathMatch: 'full'
    },
    {
        path:"home",
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'quien-soy',
        component: QuienSoyComponent
    },
    
    {
        path: "ahorcado",
        loadComponent: () => import("./page/games/ahorcado/ahorcado.component").then((m) => m.AhorcadoComponent)
    },
    {
        path: "mayor-menor",
        loadComponent: () => import("./page/games/mayor-menor/mayor-menor.component").then((m) => m.MayorMenorComponent)
    },
    {
        path: "preguntados",
        loadComponent: () => import("./page/games/preguntados/preguntados.component").then((m) => m.PreguntadosComponent)
    },
    {
        path: "juego-propio",
        loadComponent: () => import("./page/games/juego-propio/juego-propio.component").then((m) => m.JuegoPropioComponent)
    },
];
