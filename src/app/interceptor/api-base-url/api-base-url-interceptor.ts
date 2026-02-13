import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Config } from '../../servizi/config/config';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(Config);
  const apiBaseUrl = config.apiBaseUrl();
  
  if (req.url.startsWith('/api/')) {
    const apiReq = req.clone({
      url: `${apiBaseUrl}${req.url}`
    });
    return next(apiReq);
  }
  
  return next(req);
};
