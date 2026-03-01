import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelloAeroporto } from '../modello/modello-aeroporto';
import { Config } from '../../../config/config';

@Injectable({
  providedIn: 'root',
})
export class AeroportiService {
  private http = inject(HttpClient);
  private config = inject(Config);
  private apiUrl = `${this.config.apiBaseUrl()}/api/aeroporti`;

  getAeroporti(): Observable<ModelloAeroporto[]> {
    return this.http.get<ModelloAeroporto[]>(this.apiUrl);
  }

  getAeroporto(id: number): Observable<ModelloAeroporto> {
    return this.http.get<ModelloAeroporto>(`${this.apiUrl}/${id}`);
  }

  deleteAeroporto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createAeroporto(aeroporto: Partial<ModelloAeroporto>): Observable<ModelloAeroporto> {
    return this.http.post<ModelloAeroporto>(this.apiUrl, aeroporto);
  }

  updateAeroporto(id: number, aeroporto: Partial<ModelloAeroporto>): Observable<ModelloAeroporto> {
    return this.http.put<ModelloAeroporto>(`${this.apiUrl}/${id}`, aeroporto);
  }
}
