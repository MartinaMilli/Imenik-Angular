import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { MyContactsComponent } from './my-contacts/my-contacts.component';
import { NewContactComponent } from './new-contact/new-contact.component';

const routes: Routes = [
  {path: '', redirectTo: 'my-contacts', pathMatch: 'full'},
  {path: 'my-contacts', component: MyContactsComponent},
  {path: 'my-contacts/details/:id', component: DetailsComponent},
  {path: 'my-contacts/details/:id/edit', component: EditContactComponent},
  {path: 'new-contact', component: NewContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
