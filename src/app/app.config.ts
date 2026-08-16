import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { InstruccionesService } from './services/instrucciones.service';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), InstruccionesService],
};
