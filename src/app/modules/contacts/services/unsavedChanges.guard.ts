import { CanDeactivate, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FormComponent {
  form: FormGroup;
}

@Injectable({providedIn: 'root'})
export class UnsavedChangesGuardService implements CanDeactivate<FormComponent> {
  constructor(private router: Router){}

  canDeactivate(component: FormComponent): Observable<boolean>|Promise<boolean>|boolean {
    const navObject = this.router.getCurrentNavigation();
    if (navObject && navObject.extras.state && navObject.extras.state.bypassFormGuard) {
      return true;
   }

    if (component.form.dirty) {
      return confirm(
        'Jeste li sigurni da želite napustiti stranicu? Unesene promjene neće biti spremljene!'
      );
    }
    return true;
  }
}
