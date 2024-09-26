import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario: any = null;
  private router = inject(Router);
  private auth = inject(Auth);

  constructor() {
    this.auth.onAuthStateChanged((auth) =>{
      console.log(auth);
      if(auth?.email){
        this.usuario = auth;
      }
    })
  }

  
  ngOnInit(){
    
  }

  login(email: string, clave: string) {
    signInWithEmailAndPassword(this.auth, email, clave);
    console.log('logeado');

    this.router.navigateByUrl('/home');
  }

  registro(email: string, clave: string) {
    createUserWithEmailAndPassword(this.auth, email, clave)
      .then(() => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.handleError(error);
        console.log('Error en la creación del usuario');
      });
  }

  carrarSesion(){
    Swal.fire({
      title: "Estas seguro de cerrar sesion?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cerrar sesion"
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.signOut().then(() => {
          this.usuario = null;
          Swal.fire({
          title: "Sesion cerrada",
          icon: "success"
          });
        });
        this.router.navigateByUrl("/login");
      }
    });
  }

  handleError(error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.error('El correo electrónico ya está en uso.');
      Swal.fire({
        icon: 'error',
        title: 'El correo electrónico ya está en uso',
        text: 'El correo electrónico que intentas usar ya está registrado. Por favor, pruebe con otro o inicie sesion.',
        heightAuto: false,
      });
    } else {
      console.error('Error durante la creación del usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al intentar crear el usuario. Por favor, intenta nuevamente.',
        heightAuto: false,
      });
    }
  }
}
