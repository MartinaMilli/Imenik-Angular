import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.css']
})
export class MyContactsComponent implements OnInit {

  contacts: Contact[];

  constructor( private contactService: ContactService ) { }

  ngOnInit(): void {
    this.contacts = this.contactService.contactList;
  }

}
