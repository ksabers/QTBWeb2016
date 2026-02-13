import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class Config {
  private _apiBaseUrl = signal<string>('http://localhost:5000'); // fallback
  
  readonly apiBaseUrl = this._apiBaseUrl.asReadonly();

  async load(): Promise<void> {
    try {
      // Angular 21: public/ è servito da root
      const response = await fetch('/app-config.json'); // <-- NO /assets o /public
      if (!response.ok) throw new Error(`Config fetch failed: ${response.status}`);
      
      const config = await response.json();
      console.log('📁 Config raw:', config);
      this._apiBaseUrl.set(config.apiBaseUrl);
      console.log('✅ Config loaded:', config.apiBaseUrl);
    } catch (error) {
      console.error('❌ Config load ERROR:', error);
      this._apiBaseUrl.set('http://localhost:7185'); // fallback corretto
    }
  }
}


/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
  apiBaseUrl: string;
  // altri campi futuri...
}

@Injectable({ providedIn: 'root' })
export class Config {
  private config: AppConfig | null = null;

  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    try {
      const cfg = await firstValueFrom(
        this.http.get<AppConfig>('/public/app-config.json')
      );
      this.config = cfg;
    } catch (err) {
      console.error('Errore nel caricamento di app-config.json', err);
      this.config = {
        apiBaseUrl: `${window.location.origin}/api`
      };
    }
  }

  get apiBaseUrl(): string {
    if (!this.config) {
      throw new Error('Config non ancora caricata');
    }
    return this.config.apiBaseUrl;
  }
}
 */