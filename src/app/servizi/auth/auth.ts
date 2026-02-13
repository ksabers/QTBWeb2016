import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { computed } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../../interfacce/login-response';
import { LoginRequest } from '../../interfacce/login-request';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Signals moderni Angular 21
  private _token = signal<string | null>(localStorage.getItem('authToken'));
  private _utente = signal<LoginResponse['utente'] | null>(null);
  private _voloAttivo = signal<number | null>(null);

  // Computed reattivi
  readonly token = this._token.asReadonly();
  readonly utente = this._utente.asReadonly();
  readonly autenticato = computed(() => !!this._token());
  readonly voloAttivo = computed(() => !!this._voloAttivo());

  login(credenziali: LoginRequest) {
    return this.http.post<LoginResponse>('/api/auth/login', credenziali).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token);
        this._token.set(response.token);
        this._utente.set(response.utente);
        this._voloAttivo.set(response.utente.voloInCorsoId ?? null);
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    this._token.set(null);
    this._utente.set(null);
    this._voloAttivo.set(null);
    this.router.navigate(['/login']);
  }

  // JWT Interceptor userà questo
  getTokenHeader() {
    return this._token() ?? '';
  }
}
