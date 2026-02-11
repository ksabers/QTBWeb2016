import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Config } from '../../servizi/config/config';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(Config);
  const url = req.url;

  // Se l'URL è già assoluto, non lo tocchiamo
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return next(req);
  }

  const base = config.apiBaseUrl.replace(/\/+$/, '');
  const path = url.replace(/^\/+/, '');

  const apiReq = req.clone({
    url: `${base}/${path}`
  });

  return next(apiReq);
};
