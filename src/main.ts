import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAppInitializer, inject } from '@angular/core';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { Config } from './app/servizi/config/config';
import { apiBaseUrlInterceptor } from './app/interceptors/api-base-url/api-base-url-interceptor';
import { jwtInterceptor } from './app/interceptors/jwt/jwt-interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([apiBaseUrlInterceptor, jwtInterceptor])),
    Config, 
    provideAppInitializer(() => {
        const config = inject(Config);
        console.log('⏳ Loading config...');
        return config.load(); // Angular aspetta che questa Promise finisca
    })
  ]
}).catch(err => console.error('Bootstrap failed:', err));