import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { Component } from '@angular/core';
import { HomeComponent } from './page/home/home.component';
import { QuienSoyComponent } from './page/quien-soy/quien-soy.component';
import { RegistrarseComponent } from './auth/registrarse/registrarse.component';

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
        path: 'games',
        loadChildren: () => import('./page/games/games.module').then(m => m.GamesModule)
    },
    {
        path: 'registrarse',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
];
