import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-warning',
  templateUrl: './dialog-warning.component.html',
  styleUrls: ['./dialog-warning.component.css']
})
export class DialogWarningComponent implements OnInit {

  data: any;
  constructor(
    private dialogRef: MatDialogRef<DialogWarningComponent>, @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.data = data;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
