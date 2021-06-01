import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoggedInGuard } from './services/logged-in.guard';
import { HomeComponent } from './components/home/home.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent, canActivate: [LoggedInGuard]},
  {path: 'home', component: HomeComponent, canActivate: [LoggedInGuard]},
  {path: 'passwordReset', component: PasswordResetComponent, canActivate: [LoggedInGuard]},
  {path: 'contact', loadChildren: () => import('./modules/contacts/contact.module').then(m => m.ContactsModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
