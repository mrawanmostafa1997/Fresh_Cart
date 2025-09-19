import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from './app.config';

export const serverConfig: ApplicationConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideServerRendering(),
    provideHttpClient(withFetch()), // server HttpClient
  ],
};
