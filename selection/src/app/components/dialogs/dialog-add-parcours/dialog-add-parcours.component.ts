import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-parcours',
  templateUrl: './dialog-add-parcours.component.html',
  styleUrls: ['./dialog-add-parcours.component.css']
})
export class DialogAddParcoursComponent implements OnInit {

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddParcoursComponent>) { 
      this.form = this.fb.group({
        etab: ['', [Validators.required,Validators.minLength(4)]],
        mention: ['', [Validators.required,Validators.minLength(4)]],
        parcours: ['', [Validators.required,Validators.minLength(4)]],
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
