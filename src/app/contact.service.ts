import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({providedIn: 'root'})
export class ContactService {


    contactsChanged = new Subject<Contact[]>();

    private contacts: Contact[] = JSON.parse(localStorage.getItem('Contacts'));

    get contactList(): Contact[] {
        // return JSON.parse(localStorage.getItem('Contacts'));
        return this.contacts.slice();
    }

    getContact(id: number): Contact {
        return this.contacts[id];
        // return JSON.parse(localStorage.getItem('Contacts'))[id];
    }

    addContact(newContact: Contact): void{
        this.contacts.push(newContact);
        this.contactsChanged.next(this.contacts.slice());
        this.persistData(this.contacts);
    }

    updateContact(newContact: Contact, id: number): void {
        this.contacts[id] = newContact;
        this.contactsChanged.next(this.contacts.slice());
        this.persistData(this.contacts);
    }

    deleteContact(index: number): void {
        this.contacts.splice(index, 1);
        this.contactsChanged.next(this.contacts.slice());
        this.persistData(this.contacts);
    }

    private persistData(contacts: Contact[]): void {
        localStorage.setItem('Contacts', JSON.stringify(contacts));
    }
}
