import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoggedInGuard } from './services/logged-in.guard';
import { HomeComponent } from './components/home/home.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoggedInGuard]},
  {path: 'passwordReset', component: PasswordResetComponent, canActivate: [LoggedInGuard]},
  {path: 'my-contacts', loadChildren: () => import('./modules/contacts/contacts.module').then(m => m.ContactsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
