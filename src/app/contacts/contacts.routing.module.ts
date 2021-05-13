import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { MyContactsComponent } from './components/my-contacts/my-contacts.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { AuthGuart } from './services/auth.guard';


const routes: Routes = [
    {path: '', component: MyContactsComponent, canActivate: [AuthGuart]},
    {path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuart]},
    {path: 'details/:id/edit', component: EditContactComponent, canActivate: [AuthGuart]},
    {path: 'new-contact', component: NewContactComponent, canActivate: [AuthGuart]}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ContactsRoutingModule {}
