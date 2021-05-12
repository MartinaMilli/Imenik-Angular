import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpService } from './http.service';


@Injectable({providedIn: 'root'})
export class ContactService {

    private contacts: Contact[] = [];
    contactsChanged = new Subject<Contact[]>();
    isFetching = false;
    fetchingState = new Subject<boolean>();

    constructor(
        private httpService: HttpService,
        private _snackBar: MatSnackBar){}

    get contactList(): Contact[] {
        return this.contacts.slice();
    }

    getContact(id: number): Contact {
        return this.contacts[id];
    }

    fetchContacts(): void {
        this.isFetching = true;
        this.fetchingState.next(this.isFetching);

        this.httpService.fetchContactData().subscribe(contactArr => {
            this.isFetching = false;
            this.fetchingState.next(this.isFetching);
            this.contacts = contactArr;
            this.contactsChanged.next(this.contacts.slice());
          });
    }

    addContact(newContact: Contact): void {
        this.httpService.saveContactData(newContact).subscribe(contactId => {
            this.contacts.push({...newContact, id: contactId});
            this._snackBar.open('Kontakt je spremljen!', '', {duration: 1500});
          });
        this.contactsChanged.next(this.contacts.slice());
        console.log(this.contacts);
    }

    updateContact(newContact: Contact, id: number): void {
        console.log(this.contacts);
        const currId = this.contacts[id].id;
        console.log(currId);
        this.contacts[id] = {...newContact, id: currId};
        this.contactsChanged.next(this.contacts.slice());
        this.httpService.updateContactData(this.contacts[id], currId).subscribe(response => {
            this._snackBar.open('Promjene su spremljene!', '', {duration: 1500});
        });
        console.log(currId);
    }

    deleteContact(index: number): void {
        const contactToDelete = this.contacts[index];
        this.contacts.splice(index, 1);
        this.contactsChanged.next(this.contacts.slice());
        this.httpService.deleteContactData(contactToDelete).subscribe(response => {
            this._snackBar.open('Kontakt je izbrisan!', '', {duration: 1500});
        });
    }

    deleteAllContacts(): void {
        this.contacts = [];
        this.contactsChanged.next(this.contacts.slice());
        this.httpService.deleteAllContactData().subscribe(response => {
            this._snackBar.open('Svi kontakti su izbrisani!', '', {duration: 1500});
        });
    }
}
