import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class MyContactsComponent implements OnInit, OnDestroy {

  contacts: Contact[] = [];
  // keep track of changes in the contactService
  contactSub: Subscription;
  displayedColumns: string[] = ['name', 'email', 'details', 'edit', 'delete'];
  isFetching: boolean;
  fetchingSub: Subscription;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.fetchingSub = this.contactService.fetchingState.subscribe(fetching => {
    //   this.isFetching = fetching;
    // });
    // this.contactService.fetchContacts();
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
    this.dialog.open(
      DialogComponent,
      { width: '500px',
        data: {firstName: currentContact.firstName, lastName: currentContact.lastName, id: i},
        panelClass: 'custom-modalbox'});
  }

  onDeleteAll(): void {
    this.contactService.deleteAllContacts();
  }

  ngOnDestroy(): void {
    this.contactSub.unsubscribe();
    // this.fetchingSub.unsubscribe();
  }
}
