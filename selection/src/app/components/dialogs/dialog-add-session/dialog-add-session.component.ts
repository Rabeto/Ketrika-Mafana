import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SessionsService } from '../../../services/sessions.service';

@Component({
  selector: 'app-dialog-add-session',
  templateUrl: './dialog-add-session.component.html',
  styleUrls: ['./dialog-add-session.component.css']
})
export class DialogAddSessionComponent implements OnInit {

  form: FormGroup;
  annee: string[];
  sessionsAnnee: string[];
  selectedAnnee: string;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddSessionComponent>,
    private sessionsService: SessionsService) { 
      this.form = this.fb.group({
        desc: ['', [Validators.required]]
      });
      this.annee = [];
      this.sessionsAnnee = [];
      this.selectedAnnee = '';
    }

  ngOnInit(): void {
    this.allSessions();
    this.makeYearUniv();
  }

  allSessions() {
    this.sessionsService.allSessions().subscribe((data) => {
      if (data) {
        for (let i =0; i<data.length; i++){
          this.sessionsAnnee.push(data[i].sessionAnnee)
        }
      }
    });
  }

  save() {
    this.form.value.annee = this.selectedAnnee;
    this.dialogRef.close(this.form.value);
  }

  makeYearUniv() {
    let dateNow = new Date();
    let y = dateNow.getFullYear();
    for(let i=0; i<5; i++) {
      let an = (Number(y) - (i + 1)).toString() + "-" + (Number(y) - (i)).toString();
      this.annee.push(an);
    }
    this.selectedAnnee = this.annee[4];
  }

  formValid() {
    if(this.form.valid && !this.sessionsAnnee.includes(this.form.value.annee)){
      return true;
    } else {
      return false;
    }
  }

  close(){
    this.dialogRef.close();
  }

}
