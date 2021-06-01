import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
  @ViewChild('filterInput')  filterInput: ElementRef;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'details', 'edit', 'delete'];
  filterColumns: string[] = ['Ime', 'Prezime', 'E-mail adresa'];
  filterProperty = '';
  selected = '';


  contactSub: Subscription;
  fetchingSub: Subscription;
  isFetching: boolean;

  constructor(
    private contactService: ContactService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit(): void {
    // dohvacanje podataka kada se korisnik ulogira
    if (this.authService.loggedIn) {
      this.contactService.fetchContacts();
      this.authService.loggedIn = false;
    }

    this.dataSource.data = this.contactService.contactList;
    this.contactSub = this.contactService.contactsChanged.subscribe(contacts => {
      this.dataSource.data = contacts;
      this.resetTable();
    });
    this.paginator._intl.itemsPerPageLabel = 'Prikazano po stranici';

    // loading spinner
    this.isFetching = this.contactService.isFetching;
    this.fetchingSub = this.contactService.fetchingState.subscribe(fetching => {
      this.isFetching = fetching;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setupFilter(): any {
    switch (this.selected) {
      case 'Ime':
        this.filterProperty = 'firstName';
        break;
      case 'Prezime':
        this.filterProperty = 'lastName';
        break;
      case 'E-mail adresa':
        this.filterProperty = 'email';
        break;
      default: this.filterProperty = 'firstName';
    }
    this.dataSource.filterPredicate = (d: Contact, filter: string) => {
      const textToSearch = d[this.filterProperty] && d[this.filterProperty].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  private resetTable(): void {
    const table = document.getElementById('tbl');
    table.scrollLeft = 0;
    this.dataSource.filter = '';
    this.filterInput.nativeElement.value = '';
  }

  onDetails(id: string): void {
    this.router.navigate(['contact', id, 'details']);
  }

  onEdit(id: string): void {
    this.router.navigate(['contact', id, 'edit']);
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
