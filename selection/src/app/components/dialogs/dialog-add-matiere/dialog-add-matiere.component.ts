import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-matiere',
  templateUrl: './dialog-add-matiere.component.html',
  styleUrls: ['./dialog-add-matiere.component.css']
})
export class DialogAddMatiereComponent implements OnInit {

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddMatiereComponent>) { 
      this.form = this.fb.group({
        code: ['', [Validators.required,Validators.maxLength(5)]],
        matiere: ['', [Validators.required,Validators.minLength(4)]],
        coeff: ['', [Validators.required,Validators.min(1), Validators.max(10)]],
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
