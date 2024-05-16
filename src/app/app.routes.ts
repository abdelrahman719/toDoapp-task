import { Routes } from '@angular/router';
import { NotfoundComponent } from './Shared/components/notfound/notfound.component';
import { LoginComponent } from './Auth/login/login.component';
import { HomeComponent } from './Features/home/home.component';
import { RegisterComponent } from './Auth/register/register.component';
import { authGuard } from './Core/gaurds/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./Auth/login/login.component').then((comp) => comp.LoginComponent)
  },
  {
    path: 'signup', loadComponent: () =>
      import('./Auth/register/register.component').then((comp) => comp.RegisterComponent)
  },
  {
    path: 'board',
    loadComponent: () =>
      import('./Features/home/home.component').then((comp) => comp.HomeComponent), canActivate: [authGuard]
  },

  {
    path: '**', loadComponent: () =>
      import('./Shared/components/notfound/notfound.component').then((comp) => comp.NotfoundComponent)
  }
];;
