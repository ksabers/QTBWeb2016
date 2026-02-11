import { bootstrapApplication } from '@angular/platform-browser';
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
