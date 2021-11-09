import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { DossiersService } from '../../../services/dossiers.service';
import { RelevesService } from '../../../services/releves.service';
import { NotesService } from '../../../services/notes.service';
import { MatieresService } from '../../../services/matieres.service';

@Component({
  selector: 'app-dialog-add-notes',
  templateUrl: './dialog-add-notes.component.html',
  styleUrls: ['./dialog-add-notes.component.css']
})
export class DialogAddNotesComponent implements OnInit {

  data: any;
  dossier: any;
  rn: any;
  notes: any[];
  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<DialogAddNotesComponent>, @Inject(MAT_DIALOG_DATA) data: any,
    private dossiersService: DossiersService,
    private relevesService: RelevesService,
    private matieresService: MatieresService,
    private notesService: NotesService,
    private fb: FormBuilder
  ) {
    this.data = data;
    this.notes = [];
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.getDossier();
  }

  getDossier() {
    this.dossiersService.getDossierById(this.data.id).subscribe((data) => {
      this.dossier = data;
      this.relevesService.getRNDossier(this.data.id).subscribe((rn) => {
        this.rn = rn;
        this.matieresService.allMatieres().subscribe((matieres)=> {
          if (matieres){
            matieres.forEach((matiere: any) => {
              this.notesService.getNote(this.data.id, matiere.matiereId).subscribe((n)=>{
                let note = {
                  matiere : matiere,
                  note : n,
                }
                this.form.addControl(n.noteId, new FormControl('', [Validators.required, Validators.max(20), Validators.min(3)]));
                this.notes.push(note);
              });
            });
          }
        });
      });
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

  close() {
    this.dialogRef.close();
  }

}
