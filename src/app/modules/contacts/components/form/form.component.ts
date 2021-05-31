import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/modules/contacts/models/contact.model';
import { ContactService } from 'src/app/modules/contacts/services/contact.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, FormComponent, OnDestroy {

  form: FormGroup;
  @Input() mode: 'edit' | 'new';
  currentContact: Contact;
  currentId: string = null;
  maxDate: Date;
  isLoading: boolean;
  isLoadingSub: Subscription;

  constructor(
      private contactService: ContactService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.isLoading = this.contactService.isFetching;
    this.isLoadingSub = this.contactService.fetchingState.subscribe(isFetching => {
      this.isLoading = isFetching;
    });

    if (this.router.url.includes('new')) {
      this.mode = 'new';
    }
    if (this.router.url.includes('edit')) {
      this.mode = 'edit';
    }

    this.maxDate = new Date();
    let currFirstName = '';
    let currLastName = '';
    let currEmail = '';
    let currPhonePrefix = '';
    let currPhoneNum = '';
    let currStreet = '';
    let currZip = '';
    let currCity = '';
    let currBirthDate = null;

    if (this.mode === 'edit') {
      this.currentId = this.route.snapshot.params.id;

      this.currentContact = this.contactService.getContact(this.currentId);
      currFirstName = this.currentContact.firstName;
      currLastName = this.currentContact.lastName;
      currEmail = this.currentContact.email;
      currPhonePrefix = this.currentContact.phonePrefix;
      currPhoneNum = this.currentContact.phoneNum;
      currStreet = this.currentContact.street;
      currZip = this.currentContact.zip;
      currCity = this.currentContact.city;
      currBirthDate = this.currentContact.birthDate;
    }

    this.form = new FormGroup(
      {
        firstName: new FormControl(currFirstName, Validators.required),
        lastName: new FormControl(currLastName, Validators.required),
        email: new FormControl(currEmail, Validators.email),
        phonePrefix: new FormControl(currPhonePrefix),
        phoneNum: new FormControl(currPhoneNum, Validators.pattern('[0-9]{7}')),
        street: new FormControl(currStreet, Validators.maxLength(20)),
        zip: new FormControl(currZip, Validators.pattern('[0-9]{5}')),
        city: new FormControl(currCity),
        birthDate: new FormControl(currBirthDate),
      }
    );
  }

  onCancelClick(): void {
    this.router.navigate(['my-contacts']);
  }

  onSubmit(): void {
    if (this.mode === 'edit') {
      // update new contact
      this.contactService.updateContact(this.form.value, this.currentId);
    }
    if (this.mode === 'new') {
      // otherwise, save new contact
      this.contactService.addContact(this.form.value);
    }
  }

  ngOnDestroy(): void {
    this.isLoadingSub.unsubscribe();
  }
}
