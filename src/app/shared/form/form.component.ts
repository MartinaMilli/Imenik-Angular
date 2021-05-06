import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';
import { Contact } from 'src/app/contact.model';
import { ContactService } from 'src/app/contact.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  @Input() mode: 'details' | 'edit' | 'new' = 'details';
  currentContact: Contact;
  currentId: number = null;

  constructor(
      private contactService: ContactService,
      private route: ActivatedRoute,
      private router: Router,
      private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    let currFirstName = '';
    let currLastName = '';
    let currEmail = '';
    let currPhonePrefix = '';
    let currPhoneNum = '';
    let currStreet = '';
    let currZip = '';
    let currCity = '';
    let currBirthDate = null;

    if (this.mode === 'details' || this.mode === 'edit') {
      this.getCurrentId();

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
        firstName: new FormControl({value: currFirstName, disabled: this.mode === 'details'}, Validators.required),
        lastName: new FormControl({value: currLastName, disabled: this.mode === 'details'}, Validators.required),
        email: new FormControl({value: currEmail, disabled: this.mode === 'details'}, [Validators.required, Validators.email]),
        phonePrefix: new FormControl({value: currPhonePrefix, disabled: this.mode === 'details'}, Validators.required),
        phoneNum: new FormControl({value: currPhoneNum, disabled: this.mode === 'details'}, Validators.required),
        street: new FormControl({value: currStreet, disabled: this.mode === 'details'}, Validators.required),
        zip: new FormControl({value: currZip, disabled: this.mode === 'details'}, Validators.required),
        city: new FormControl({value: currCity, disabled: this.mode === 'details'}, Validators.required),
        birthDate: new FormControl({value: currBirthDate, disabled: this.mode === 'details'}, Validators.required),
      }
    );
  }

  private getCurrentId(): number {
    return this.currentId = this.route.snapshot.params.id;
  }

  onCancelClick(): void {
    this.router.navigate(['..']);
  }

  onSubmit(): void {
    if (this.mode === 'edit') {
      // update new contact
      this.contactService.updateContact(this.form.value, this.currentId);
      this._snackBar.open('Promjene su spremljene!', '', {duration: 1500});
    }
    if (this.mode === 'new') {
      // otherwise, save new contact
      this.contactService.addContact(this.form.value);
      this._snackBar.open('Kontakt je spremljen!', '', {duration: 1500});
      this.form.reset();
      Object.keys(this.form.controls).forEach(key =>{
        this.form.controls[key].setErrors(null)
     });
      
    }
  }
}
