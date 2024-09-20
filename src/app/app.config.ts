import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'sala-de-juegos-danielanuxez',
        appId: '1:1056512323032:web:4006e3b6d8780ad9cb96ad',
        storageBucket: 'sala-de-juegos-danielanuxez.appspot.com',
        apiKey: 'AIzaSyCLZpvi2Uuin5LvmGJgreOjYfRw-j1us6g',
        authDomain: 'sala-de-juegos-danielanuxez.firebaseapp.com',
        messagingSenderId: '1056512323032',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};
