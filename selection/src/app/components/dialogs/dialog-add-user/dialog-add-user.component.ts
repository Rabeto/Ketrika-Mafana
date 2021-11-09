import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParcoursService } from '../../../services/parcours.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css']
})
export class DialogAddUserComponent implements OnInit {

  form: FormGroup;
  parcours: any[];
  selectedParcours: string;
  constructor(
    private fb: FormBuilder,
    private parcoursService: ParcoursService,
    private dialogRef: MatDialogRef<DialogAddUserComponent>) { 
      this.form = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(4)]],
        fullname: ['', [Validators.required, Validators.minLength(4)]],
        mail: ['', [Validators.required, Validators.email]]
      });
      this.parcours = [];
      this.selectedParcours = '';
    }

  ngOnInit(): void {
    this.parcoursService.allParcours().subscribe((data) => {
      this.parcours = data;
    })
  }

  save() {
    this.form.value.parcours = this.selectedParcours;
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
