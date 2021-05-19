import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class MyContactsComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource<Contact>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  filterStringValue = '';
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
    this.paginator._intl.itemsPerPageLabel = 'Prikazano po stranici';
    this.isFetching = this.contactService.isFetching;
    this.fetchingSub = this.contactService.fetchingState.subscribe(fetching => {
      this.isFetching = fetching;
    });
    this.dataSource.data = this.contactService.contactList;
    this.contactSub = this.contactService.contactsChanged.subscribe(contacts => {
      this.dataSource.data = contacts;
      this.resetFilter();
    });
    console.log(this.dataSource.data);

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilter(): void {
    this.dataSource.filter = this.filterStringValue;
  }

  private resetFilter(): void {
    this.dataSource.filter = '';
    this.filterStringValue = '';
  }

  onDetails(id: string): void {
    console.log(id);
    this.router.navigate(['details', id], {relativeTo: this.route});
  }

  onEdit(id: string): void {
    this.router.navigate(['details', id, 'edit'], {relativeTo: this.route});
  }

  onDelete(id: string): void {
    const currentContact = this.contactService.getContact(id);
    this.dialog.open(
      DialogComponent,
      { width: '500px',
        data: {id: id, message: 'Jeste li sigurni da želite obrisati kontakt ' + currentContact.firstName + ' ' +  currentContact.lastName + '?'},
        panelClass: 'custom-modalbox'});
  }

  onDeleteAll(): void {
    this.dialog.open(
      DialogComponent,
      { width: '500px',
        data: {message: 'Jeste li sigurni da želite obrisati sve kontakte?'},
        panelClass: 'custom-modalbox'});
  }

  ngOnDestroy(): void {
    this.contactSub.unsubscribe();
    this.fetchingSub.unsubscribe();
  }
}
