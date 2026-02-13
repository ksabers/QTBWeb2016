// TEMPORANEO - sostituisci tutto main.ts con questo
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { Config } from './app/servizi/config/config';
import { apiBaseUrlInterceptor } from './app/interceptors/api-base-url/api-base-url-interceptor';
import { jwtInterceptor } from './app/interceptors/jwt/jwt-interceptor';

async function waitForConfig(config: Config) {
  console.log('⏳ Loading config...');
  await config.load();
  console.log('✅ Config ready!');
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([apiBaseUrlInterceptor, jwtInterceptor])),
    Config
  ]
}).then(async appRef => {
  // Blocca fino a config caricata
  const config = appRef.injector.get(Config);
  await waitForConfig(config);
}).catch(err => console.error('Bootstrap failed:', err));