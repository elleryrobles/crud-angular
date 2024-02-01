import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    //{ path: 'user-list', component: UserListComponent, canActivate: [tokenGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];