import { ApplicationConfig, isDevMode } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';


import {provideAnimations} from '@angular/platform-browser/animations'
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import * as appState from '../app/Store/app.state';
import { provideStoreDevtools } from '@ngrx/store-devtools'

import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { LoadingInterceptor } from './Core/interceptors/loading.interceptor';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';



export const appConfig: ApplicationConfig = {
  providers: [
 
    provideRouter(routes),
  
    provideHttpClient(withInterceptorsFromDi()),
    //provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    provideAnimations(),
    provideRouterStore(),
    provideStore(appState.appState),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    MessageService
  
]
};
