import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { MyContactsComponent } from './components/my-contacts/my-contacts.component';
import { AuthGuard } from '../../services/auth.guard';
import { UnsavedChangesGuardService } from './services/unsavedChanges.guard';
import { FormComponent } from './components/form/form.component';
import { ContactComponent } from './contact.component';


const routes: Routes = [
    {path: '', component: ContactComponent, canActivate: [AuthGuard]},
    {path: 'my-contacts', component: MyContactsComponent, canActivate: [AuthGuard]},
    {path: 'new', component: FormComponent, canDeactivate: [UnsavedChangesGuardService]},
    {path: ':id/details', component: DetailsComponent, canActivate: [AuthGuard]},
    {path: ':id/edit', component: FormComponent, canDeactivate: [UnsavedChangesGuardService]},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ContactRoutingModule {}
