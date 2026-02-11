import { Injectable } from '@angular/core';
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
        this.http.get<AppConfig>('assets/app-config.json')
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
