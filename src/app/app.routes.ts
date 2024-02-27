import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductListComponent } from './components/product-list/product-list.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { User2ListComponent } from './components/user-list/user-list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    /*{
        path: '',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },*/
    {
        path: '', 
        component: LayoutComponent, 
        canActivate: [authGuard],
        children: [
            {
                path: 'home', 
                component: HomeComponent, 
                canActivate: [authGuard]
            },
            {
                path: 'user-list', 
                component: UserListComponent, 
                canActivate: [authGuard]
            }
        ]
    },/*
    //{ path: '**', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'user-list', component: User2ListComponent, canActivate: [authGuard] },
    { path: 'product-list', component: ProductListComponent, canActivate: [authGuard] },
    { path: 'invoice-list', component: InvoiceListComponent, canActivate: [authGuard] },
    { path: 'item-list', component: ItemListComponent, canActivate: [authGuard] },
    //{ path: '', redirectTo: '/login', pathMatch: 'full' }*/
];
