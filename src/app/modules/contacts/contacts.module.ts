import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { SharedModule } from '../shared/shared.module';

import { DetailsComponent } from './components/details/details.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { FormComponent } from './components/form/form.component';
import { MyContactsComponent } from './components/my-contacts/my-contacts.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { ContactsRoutingModule } from './contacts.routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ContactsRoutingModule,
        SharedModule,
        FormsModule
    ],

    declarations: [
        DetailsComponent,
        DialogComponent,
        EditContactComponent,
        FormComponent,
        MyContactsComponent,
        NewContactComponent
    ]
})
export class ContactsModule {}
