import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  // stato UI
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  hidePassword = signal(true);

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  togglePasswordVisibility() {
    this.hidePassword.update(v => !v);
  }

  submit() {
    this.errorMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const credentials = this.form.value;

    // TODO: aggiorna URL con quello del tuo backend
    this.http.post<{ token: string }>(
      '/api/auth/login',
      credentials
    ).subscribe({
      next: (response) => {
        // Salva il token JWS (esempio: localStorage)
        localStorage.setItem('auth_token', response.token);

        this.isSubmitting.set(false);
        // Vai alla dashboard dopo login
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        // Messaggio di errore generico, raffinabile con err.status
        this.errorMessage.set(
          err.status === 401
            ? 'Credenziali non valide.'
            : 'Errore durante il login. Riprova.'
        );
      }
    });
  }
}
