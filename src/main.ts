// TEMPORANEO - sostituisci tutto main.ts con questo
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { Config } from './app/servizi/config/config';
import { apiBaseUrlInterceptor } from './app/interceptor/api-base-url/api-base-url-interceptor';

async function waitForConfig(config: Config) {
  console.log('⏳ Loading config...');
  await config.load();
  console.log('✅ Config ready!');
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([apiBaseUrlInterceptor])),
    Config
  ]
}).then(async appRef => {
  // Blocca fino a config caricata
  const config = appRef.injector.get(Config);
  await waitForConfig(config);
}).catch(err => console.error('Bootstrap failed:', err));



/* import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { App } from './app/app';
import { Config } from './app/servizi/config/config';
import { apiBaseUrlInterceptor } from './app/interceptor/api-base-url/api-base-url-interceptor';

// 1. funzione che prepara HttpClient + Config per il pre-caricamento
async function loadConfigBeforeBootstrap() {
  // bootstrap "temporaneo" minimo, solo per avere HttpClient e Config
  const appRef = await bootstrapApplication(App, {
    providers: [
      provideHttpClient(), // senza interceptor, solo per leggere il JSON
      provideRouter([]),   // router vuoto, non useremo questa istanza per l'app vera
      Config
    ]
  });
  const injector = appRef.injector;
  const config = injector.get(Config);

  await config.load();

  // Distruggiamo questa app temporanea
  appRef.destroy();
}


// 2. Dopo aver caricato la config, facciamo il vero bootstrap con router + interceptor
loadConfigBeforeBootstrap()
  .then(() =>
    bootstrapApplication(App, {
      providers: [
        provideRouter(routes),
        provideHttpClient(
          withInterceptors([apiBaseUrlInterceptor])
        ),
        Config
      ]
    })
  )
  .catch(err => console.error(err));
 */