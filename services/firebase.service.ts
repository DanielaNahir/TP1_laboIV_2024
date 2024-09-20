import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { Usuario } from '../src/app/classes/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  router = inject(Router);

  // autenticacion
  signIn(user: Usuario) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.clave);
  }

  // login
  logIn(user: Usuario) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.clave);
  }

  // actualizar
  update(displayName: string) {
    //return updateProfile(getAuth().currentUser, {displayName});
  }

  // setear documento
  setDoc(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  singOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
  }
}
