import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard'
import { LoginComponent } from './layout/login/login.component';
import { ErrorComponent } from './layout/error/error.component';
import { HomeComponent } from './layout/home/home.component';
import { SigninComponent } from './layout/signin/signin.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'signin', component: SigninComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const COMPONENTS = [
  SigninComponent,
  LoginComponent,
  ErrorComponent,
  HomeComponent

]
