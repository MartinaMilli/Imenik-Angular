import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ContactService } from '../../services/contact.service';

export interface DialogData {
  unsavedDataNavigation?: boolean;
  id?: string;
  message: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private contactService: ContactService) { }

  ngOnInit(): void {
  }

  onConfirm(id: string): void {
    if (this.data.unsavedDataNavigation) {
      this.contactService.navigateAway.next(true);
    } else {
      if (id) {
        this.contactService.deleteContact(id);
      } else {
        this.contactService.deleteAllContacts();
      }
    }
    this.dialogRef.close();
  }

  onDecline(): void {
    if (this.data.unsavedDataNavigation) {
      this.contactService.navigateAway.next(false);
    }
  }

}
