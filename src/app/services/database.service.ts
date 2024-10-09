import { inject, Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Mensaje } from '../classes/mensaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  usuarios: Usuario[] = [];
  constructor(private firestore: AngularFirestore) { }

  agregarUsuario(user: Usuario) {
    const usuariosCol = this.firestore.collection("usuarios");
    return usuariosCol.add({ ...user });
  }

  traerUsuarios(){
    const usuariosCol = this.firestore.collection("usuarios");
    const usuarios = usuariosCol.valueChanges();
    return usuarios;
  }

  guardarMensaje(mensaje:Mensaje){
    const usuariosCol = this.firestore.collection("chat");
    return usuariosCol.add({ ...mensaje });
  }

  cargarMensajes(): Observable<Mensaje[]> {
    return this.firestore.collection<Mensaje>('chat', ref => ref.orderBy('fecha', 'asc')).valueChanges();
  }
}
