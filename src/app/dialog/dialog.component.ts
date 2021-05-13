import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from '../contact.service';

export interface DialogData {
  firstName: string;
  lastName: string;
  id: number;
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

  onDelete(id: number): void {
    this.contactService.deleteContact(id);
    this.dialogRef.close();
  }

}
