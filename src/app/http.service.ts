import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {exhaustMap, map, take} from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Contact } from './contact.model';

@Injectable({providedIn: 'root'})
export class HttpService {

    constructor(
        private http: HttpClient){}

    fetchContactData(): Observable<Contact[]> {

        return  this.http.get('https://imenik-e150a-default-rtdb.firebaseio.com/contacts.json').pipe(map(responseData => {
            const contactArray = [];
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    contactArray.push({...responseData[key], id: key});
                }
            }
            return contactArray;
            }));
    }

    saveContactData(contact: Contact): Observable<any> {
        return this.http.post('https://imenik-e150a-default-rtdb.firebaseio.com/contacts.json', contact);
    }

    updateContactData(newContact: Contact): Observable<any> {
        return this.http.put('https://imenik-e150a-default-rtdb.firebaseio.com/contacts/' + newContact.id + '.json', newContact);
    }

    deleteContactData(contact: Contact): Observable<any> {
        return this.http.delete('https://imenik-e150a-default-rtdb.firebaseio.com/contacts/' + contact.id + '.json');
    }

    deleteAllContactData(): Observable<any> {
        return this.http.delete('https://imenik-e150a-default-rtdb.firebaseio.com/contacts.json');
    }
}
