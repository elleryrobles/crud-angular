import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { ProductListComponent } from './components/product-list/product-list.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { UserListComponent } from './page/user-list/user-list.component';
import { User2ListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
    { 
        path: 'home', 
        component: LayoutComponent, 
        canActivate: [authGuard],
        children: [
            {
                path: 'user-list', 
                component: UserListComponent, 
                canActivate: [authGuard]
            }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'user-list', component: User2ListComponent, canActivate: [authGuard] },
    { path: 'product-list', component: ProductListComponent, canActivate: [authGuard] },
    { path: 'invoice-list', component: InvoiceListComponent, canActivate: [authGuard] },
    { path: 'item-list', component: ItemListComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
