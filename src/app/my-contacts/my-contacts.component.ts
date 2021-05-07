import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.css']
})
export class MyContactsComponent implements OnInit {

  contacts: Contact[] = [];
  contactSub: Subscription;
  displayedColumns: string[] = ['name', 'email', 'details', 'edit', 'delete'];

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.contacts = this.contactService.contactList;
    this.contactSub = this.contactService.contactsChanged.subscribe(contacts => {
      this.contacts = contacts;
      console.log(this.contacts);
    });
  }

  onDetails(i: number): void {
    this.router.navigate(['details', i], {relativeTo: this.route});
  }
  onEdit(i: number): void {
    this.router.navigate(['details', i, 'edit'], {relativeTo: this.route});
  }

  onDelete(i: number): void {
    const currentContact = this.contactService.getContact(i);
    const dialogRef = this.dialog.open(
      DialogComponent,
      { width: '500px',
        data: {firstName: currentContact.firstName, lastName: currentContact.lastName, id: i},
        panelClass: 'custom-modalbox'});
  }

  onDeleteAll() {
    this.contactService.deleteAllContacts();
  }
}
