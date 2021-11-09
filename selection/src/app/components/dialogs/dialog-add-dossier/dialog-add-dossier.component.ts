import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-dossier',
  templateUrl: './dialog-add-dossier.component.html',
  styleUrls: ['./dialog-add-dossier.component.css']
})
export class DialogAddDossierComponent implements OnInit {

  form: FormGroup;
  annees: string[];
  series: any[];
  mentions: string[];
  selectedAnnee: string;
  selectedSerie: any;
  selectedMention: string;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddDossierComponent>) { 
      this.form = this.fb.group({
        nom: ['', [Validators.required,Validators.minLength(4)]],
        dateNais: ['', [Validators.required]],
        lieuNais: ['', [Validators.required,Validators.minLength(4)]],
        centre: ['', [Validators.required]],
        numero: ['', [Validators.required, Validators.maxLength(7), Validators.minLength(7)]]
      });
      this.annees = [];
      this.series = [
        {abbrev: 'A', desc: 'Serie A'},
        {abbrev: 'C', desc: 'Serie C'},
        {abbrev: 'D', desc: 'Serie D'},
        {abbrev: 'O', desc: 'Serie OSE'},
        {abbrev: 'S', desc: 'Serie S'}
      ];
      this.mentions = ['PASSABLE', 'ASSEZ BIEN', 'BIEN', 'TRES BIEN', 'EXCELLENT', 'HONORABLE'];
      this.selectedSerie = this.series[0];
      this.selectedMention = this.mentions[0];
      this.selectedAnnee = '';
    }

  ngOnInit(): void {
    this.makeYears();
    this.selectedAnnee = this.annees[0];
  }

  makeYears() {
    let dateNow = new Date();
      let y = dateNow.getFullYear();
      for (let i=0; i<20; i++) {
        this.annees.push(y.toString());
        y--;
      }
  }

  save() {
    let formValue = this.form.value;
    let data = {
      dossier: {
        dossierName: formValue.nom,
        dossierDateNaissance: formValue.dateNais,
        dossierLieuNaissance: formValue.lieuNais
      },
      releve: {
        releveNoteAnnee: this.selectedAnnee,
        releveNoteCentre: formValue.centre,
        releveNoteSerie: this.selectedSerie.abbrev,
        releveNoteNumInscription: formValue.numero,
        releveNoteMention: this.selectedMention
      }
    }
    this.dialogRef.close(data);
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
