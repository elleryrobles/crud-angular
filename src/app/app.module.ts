import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TokenGuard } from './guards/token.guard';
import { UserService } from 'src/app/services/user.service';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-list', component: UserListComponent, canActivate: [TokenGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, TokenGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
