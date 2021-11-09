import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-close-session',
  templateUrl: './dialog-close-session.component.html',
  styleUrls: ['./dialog-close-session.component.css']
})
export class DialogCloseSessionComponent implements OnInit {

  data: any;
  constructor(
    private dialogRef: MatDialogRef<DialogCloseSessionComponent>, @Inject(MAT_DIALOG_DATA) data: any
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
