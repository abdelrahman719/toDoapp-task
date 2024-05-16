import { Routes } from '@angular/router';
import { BoardComponent } from './Features/board/board.component';
import { NotfoundComponent } from './Shared/components/notfound/notfound.component';
import { LoginComponent } from './Auth/login/login.component';
import { HomeComponent } from './Features/home/home.component';
import { RegisterComponent } from './Auth/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo:'login' ,pathMatch:'full'},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent },
    { path: 'board', component: HomeComponent },

    { path: '**', component: NotfoundComponent }
  ];;
