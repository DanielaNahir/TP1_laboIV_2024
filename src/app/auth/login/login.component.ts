import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  authService = inject(AuthService);


  login(){
    this.authService.login(this.email, this.clave);
  }

  accesoRapido(){
    this.email = "admin@admin.com",
    this.clave = "123456"
  }
}
