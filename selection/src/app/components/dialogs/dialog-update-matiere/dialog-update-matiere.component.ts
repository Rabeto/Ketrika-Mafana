import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatieresService } from '../../../services/matieres.service';

@Component({
  selector: 'app-dialog-update-matiere',
  templateUrl: './dialog-update-matiere.component.html',
  styleUrls: ['./dialog-update-matiere.component.css']
})
export class DialogUpdateMatiereComponent implements OnInit {

  form: FormGroup;
  id: string;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogUpdateMatiereComponent>, @Inject(MAT_DIALOG_DATA) data: any,
    private matiereService: MatieresService) {
      this.id = data.id;
      this.form = this.fb.group({
        code: ['', [Validators.required,Validators.maxLength(5)]],
        matiere: ['', [Validators.required,Validators.minLength(4)]],
        coeff: ['', [Validators.required,Validators.min(1), Validators.max(10)]],
      });
    }

  ngOnInit(): void {
    this.matiereService.getMatiereById(this.id).subscribe((data) => {
      this.form.setValue({
        code: data.matiereCode,
        matiere: data.matiereName,
        coeff: data.matiereCoeff
      })
    });
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
