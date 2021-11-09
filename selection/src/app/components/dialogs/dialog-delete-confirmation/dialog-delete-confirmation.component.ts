import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-confirmation',
  templateUrl: './dialog-delete-confirmation.component.html',
  styleUrls: ['./dialog-delete-confirmation.component.css']
})
export class DialogDeleteConfirmationComponent implements OnInit {
  data: any;
  constructor(
    private dialogRef: MatDialogRef<DialogDeleteConfirmationComponent>, @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.data = data;
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.data.id);
  }

  close() {
    this.dialogRef.close();
  }

}