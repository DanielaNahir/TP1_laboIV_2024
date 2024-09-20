import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormsModule, NgModel } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  clave = '';

  private router = inject(Router);

  private auth = inject(Auth);

  ngOnInit(){
    this.auth.onAuthStateChanged((auth) =>{
      console.log(auth);
    })
  }
  registro() {
    createUserWithEmailAndPassword(this.auth, this.email, this.clave);
  }

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.clave);
    console.log("logeado");

    this.router.navigateByUrl("/home");
  }

  accesoRapido(){
    this.email = "prueba@prueba.com",
    this.clave = "123456"
  }
}
