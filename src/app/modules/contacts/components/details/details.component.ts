import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  currentId: string;
  currentContact: Contact;
  formattedDate: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.currentId = this.getCurrentId();
    this.currentContact = this.contactService.getContact(this.currentId);
    this.formattedDate = this.datePipe.transform(this.currentContact.birthDate, 'dd-MM-yyy');
  }

  onEditClick(): void {
    this.router.navigate(['contact', this.getCurrentId(), 'edit']);
  }

  private getCurrentId(): string {
    return this.route.snapshot.params.id;
  }
}
