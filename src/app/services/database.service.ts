import { inject, Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    usuarios.subscribe((data) =>{
      this.usuarios = data as Usuario[];
    })
  }
}
