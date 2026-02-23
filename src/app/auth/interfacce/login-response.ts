export interface LoginResponse {
  token: string;
  scadenza: string;
  utente: {
    loginId: number;
    personaId: number;
    username: string;
    email?: string;
    nome?: string;
    cognome?: string;
    voloInCorsoId?: number;
    ruoli: Array<{ id: number; descrizione: string }>;
  };
}