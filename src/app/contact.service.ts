import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({providedIn: 'root'})
export class ContactService {


    contactsChanged = new Subject<Contact[]>();

    private contacts: Contact[] = [
        {
            firstName: 'Martina',
            lastName: 'Milli',
            email: 'millimartina8@gmail.com',
            phonePrefix: '099',
            phoneNum: '4647097',
            street: 'Jezerska 32D',
            zip: '10000',
            city: 'Zagreb',
            birthDate: new Date(1997, 2, 8)
        },
        {
            firstName: 'Adriana',
            lastName: 'Milli',
            email: 'millimartina8@gmail.com',
            phonePrefix: '099',
            phoneNum: '4647097',
            street: 'Jezerska 32D',
            zip: '10000',
            city: 'Zagreb',
            birthDate: new Date(1997, 2, 8)
        }
    ];

    get contactList(): Contact[] {
        return this.contacts.slice();
    }

    getContact(id: number): Contact {
        console.log(this.contacts[2]);
        return this.contacts[id];
    }

    addContact(newContact: Contact): void{
        this.contacts.push(newContact);
        // u tablici (my contacts) se treba subscribeati i unsubscribeati na ovaj subject
        this.contactsChanged.next(this.contacts.slice());
        this.persistData(this.contacts);
    }

    updateContact(newContact: Contact, id: number): void {
        this.contacts[id] = newContact;
        // u tablici (my contacts) se treba subscribeati i unsubscribeati na ovaj subject
        this.contactsChanged.next(this.contacts.slice());
        this.persistData(this.contacts);
    }

    private persistData(contacts: Contact[]): void {
        localStorage.setItem('Contacts', JSON.stringify(contacts));
    }
}
