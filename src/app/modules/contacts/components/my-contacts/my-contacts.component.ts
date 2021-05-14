import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.css']
})
export class MyContactsComponent implements OnInit, AfterViewInit,OnDestroy {

  dataSource = new MatTableDataSource<Contact>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'details', 'edit', 'delete'];

  // keep track of changes in the contactService
  contactSub: Subscription;
  fetchingSub: Subscription;
  isFetching: boolean;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isFetching = this.contactService.isFetching;
    this.fetchingSub = this.contactService.fetchingState.subscribe(fetching => {
      this.isFetching = fetching;
    });
    this.dataSource.data = this.contactService.contactList;
    this.contactSub = this.contactService.contactsChanged.subscribe(contacts => {
      this.dataSource.data = contacts;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.fetchingSub.unsubscribe();
  }
}
