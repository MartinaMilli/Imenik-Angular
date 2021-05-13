import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './contacts/components/auth/auth.component';
import { LoggedInGuard } from './contacts/services/logged-in.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'my-contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)},
  {path: 'home', component: HomeComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
