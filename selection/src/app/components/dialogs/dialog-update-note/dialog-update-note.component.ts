import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-note',
  templateUrl: './dialog-update-note.component.html',
  styleUrls: ['./dialog-update-note.component.css']
})
export class DialogUpdateNoteComponent implements OnInit {

  form: FormGroup;
  data: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogUpdateNoteComponent>, @Inject(MAT_DIALOG_DATA) data: any
  ) {
      this.data = data;
      this.form = this.fb.group({
        note: [data.value, [Validators.required,Validators.min(3), Validators.max(20)]]
      });
    }

  ngOnInit(): void {
    
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  formValid() {
    if(this.form.valid){
      return true;
    } else {
      return false;
    }
  }

  close(){
    this.dialogRef.close();
  }

}
