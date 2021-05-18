import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ContactService } from '../../services/contact.service';

export interface DialogData {
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

  onDelete(id: string): void {
    if (id) {
      this.contactService.deleteContact(id);
    } else {
      this.contactService.deleteAllContacts();
    }

    this.dialogRef.close();
  }

}
