import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ContactRoutingModule } from './contact.routing.module';

import { DetailsComponent } from './components/details/details.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormComponent } from './components/form/form.component';
import { MyContactsComponent } from './components/my-contacts/my-contacts.component';
import { ContactComponent } from './contact.component';
import { ContactService } from './services/contact.service';
import { HttpService } from './services/http.service';
import { UnsavedChangesGuardService } from './services/unsavedChanges.guard';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ContactRoutingModule,
        SharedModule,
        FormsModule
    ],

    declarations: [
        DetailsComponent,
        DialogComponent,
        FormComponent,
        MyContactsComponent,
        ContactComponent
    ],
    providers: [
        ContactService, HttpService, UnsavedChangesGuardService, { provide: MAT_DATE_LOCALE, useValue: 'hr-HR' }
    ]
})
export class ContactsModule {}
