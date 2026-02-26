import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAppInitializer, inject, isDevMode } from '@angular/core';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { Config } from './app/config/config';
import { apiBaseUrlInterceptor } from './app/auth/api-base-url-interceptor';
import { jwtInterceptor } from './app/auth/jwt-interceptor';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';


bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([apiBaseUrlInterceptor, jwtInterceptor])),
    Config, 
    provideAppInitializer(() => {
        const config = inject(Config);
        console.log('⏳ Loading config...');
        return config.load(); // Angular aspetta che questa Promise finisca
    }), provideHttpClient(), provideTransloco({
        config: { 
          availableLangs: ['it', 'en'],
          defaultLang: 'it',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })
  ]
}).catch(err => console.error('Bootstrap failed:', err));