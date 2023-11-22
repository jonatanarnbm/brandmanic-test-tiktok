import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { TiktokService } from '../../services/tiktok.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  template: `<div class="bg-green-300 h-full">
    <header class="py-5">
      <nav class="flex items-center justify-evenly ">
        <a href="/index.html">
          <img
            class="w-12"
            src="https://cdn-icons-png.flaticon.com/512/2343/2343970.png"
            alt="Icono"
        /></a>
        <div class="flex justify-end gap-10">
          <a routerLink="/dashboard">Dashboard</a>
          <a routerLink="/">Log in</a>
        </div>
      </nav>
    </header>
    <main class="flex flex-col items-center justify-items-center ">
      <div class="bg-white p-10">
        <div class="form">
          <div>
            <h2>Brandmanic Api TikTok</h2>
          </div>
          <form class="flex flex-col gap-5">
            <mat-form-field class="example-form-field">
              <mat-label>Correo</mat-label>
              <input matInput type="text" />
            </mat-form-field>
            <mat-form-field class="example-form-field">
              <mat-label>Contraseña</mat-label>
              <input matInput type="password" />
            </mat-form-field>
            <p class="message">
              Not registered? <br /><a href="#">Create an account</a>
            </p>
            <hr />
            <a id="tiktokButton" href="{SERVER_ENDPOINT_OAUTH}"
              >Continue with TikTok</a
            >
          </form>
        </div>
      </div>
    </main>

    <footer class="flex gap-10 justify-evenly items-center h-12">
      <a href="/terms.html">Terminos y condiciones</a>
      <a href="/privacity.html">Privacidad</a>
    </footer>
  </div> `,
})
export class LoginComponent {

  
}
