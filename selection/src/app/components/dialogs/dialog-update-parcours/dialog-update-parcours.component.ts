import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParcoursService } from '../../../services/parcours.service';

@Component({
  selector: 'app-dialog-update-parcours',
  templateUrl: './dialog-update-parcours.component.html',
  styleUrls: ['./dialog-update-parcours.component.css']
})
export class DialogUpdateParcoursComponent implements OnInit {

  form: FormGroup;
  id: string;
  ordre: number;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogUpdateParcoursComponent>, @Inject(MAT_DIALOG_DATA) data: any,
    private parcoursService: ParcoursService) {
      this.id = data.id;
      this.form = this.fb.group({
        etab: ['', [Validators.required,Validators.minLength(4)]],
        mention: ['', [Validators.required,Validators.minLength(4)]],
        parcours: ['', [Validators.required,Validators.minLength(4)]],
      });
      this.ordre = 0;
    }

  ngOnInit(): void {
    this.parcoursService.getParcourById(this.id).subscribe((data) => {
      this.form.setValue({
        etab: data.parcoursEtab,
        mention: data.parcoursMention,
        parcours: data.parcoursName
      })
      this.ordre = data.parcoursOrdre;
    });
  }

  save() {
    this.form.value.ordre = this.ordre;
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
