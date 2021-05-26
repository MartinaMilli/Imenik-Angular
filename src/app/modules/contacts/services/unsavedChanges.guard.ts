import { CanDeactivate, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { ContactService } from './contact.service';

export interface FormComponent {
  form: FormGroup;
}

@Injectable()
export class UnsavedChangesGuardService implements CanDeactivate<FormComponent> {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private contactService: ContactService){}

  canDeactivate(component: FormComponent): Observable<boolean>|Promise<boolean>|boolean {
    const navObject = this.router.getCurrentNavigation();
    if (navObject && navObject.extras.state && navObject.extras.state.bypassFormGuard) {
      return true;
   }

    if (component.form.dirty) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
              unsavedDataNavigation: true,
              message: 'Jeste li sigurni da želite napustiti stranicu? Unesene promjene neće biti pohranjene!'
            },
            panelClass: 'custom-modalbox'
        });
        return this.contactService.navigateAway;
    }
    return true;
  }
  }

