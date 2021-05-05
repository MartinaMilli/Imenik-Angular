import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.css']
})
export class MyContactsComponent implements OnInit {

  contacts: Contact[];
  contactSub: Subscription;
  displayedColumns: string[] = ['name', 'email', 'details', 'edit', 'delete'];

  constructor( private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contacts = this.contactService.contactList;
    this.contactSub = this.contactService.contactsChanged.subscribe(contacts => {
      this.contacts = contacts;
      console.log(this.contacts)
    })
  }

  onDetails(i: number): void {
    this.router.navigate(['details', i], {relativeTo: this.route});
  }
  onEdit(i: number): void {
    this.router.navigate(['details', i, 'edit'], {relativeTo: this.route});
  }

  onDelete(i: number): void {
    this.contactService.deleteContact(i);
  }

}
