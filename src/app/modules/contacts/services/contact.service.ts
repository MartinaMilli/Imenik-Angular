import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { HttpService } from './http.service';


@Injectable()
export class ContactService {

    private contacts: Contact[] = [];
    contactsChanged = new Subject<Contact[]>();
    isFetching = false;
    fetchingState = new Subject<boolean>();
    navigateAway = new Subject<boolean>();

    constructor(
        private httpService: HttpService,
        private snackBar: MatSnackBar,
        private router: Router){}

    get contactList(): Contact[] {
        return this.contacts.slice();
    }

    getContact(index: string): Contact {
        return this.contacts.find( ({ id }) => id === index);
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
        this.isFetching = true;
        this.fetchingState.next(this.isFetching);
        this.httpService.saveContactData(newContact).subscribe(contactId => {
            this.isFetching = false;
            this.fetchingState.next(this.isFetching);
            this.contacts.push({...newContact, id: contactId});
            this.contactsChanged.next(this.contacts.slice());
            this.router.navigate(['contact/my-contacts'], {state: {bypassFormGuard: true}});
            this.snackBar.open('Kontakt je spremljen!', '', {duration: 1600});
          });
    }

    updateContact(newContact: Contact, id: string): void {
        this.isFetching = true;
        this.fetchingState.next(this.isFetching);
        const index = this.contacts.indexOf(this.getContact(id));
        this.contacts[index] = {...newContact, id: id};
        this.contactsChanged.next(this.contacts.slice());
        this.httpService.updateContactData(this.contacts[index]).subscribe(response => {
            this.isFetching = false;
            this.fetchingState.next(this.isFetching);
            this.router.navigate(['contact/my-contacts'], {state: {bypassFormGuard: true}});
            this.snackBar.open('Promjene su spremljene!', '', {duration: 1600});
        });
    }

    deleteContact(id: string): void {
        const contactToDelete = this.getContact(id);
        const index = this.contacts.indexOf(contactToDelete);
        this.contacts.splice(index, 1);
        this.contactsChanged.next(this.contacts.slice());
        this.httpService.deleteContactData(id).subscribe(response => {
            this.snackBar.open('Kontakt je izbrisan!', '', {duration: 1600});
        });
    }

    deleteAllContacts(): void {
        this.contacts = [];
        this.contactsChanged.next(this.contacts.slice());
        this.httpService.deleteAllContactData().subscribe(response => {
            this.snackBar.open('Svi kontakti su izbrisani!', '', {duration: 1600});
        });
    }
}
