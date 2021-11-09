import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DossiersService } from '../../../services/dossiers.service';
import { RelevesService } from '../../../services/releves.service';
import { NotesService } from '../../../services/notes.service';
import { MatieresService } from '../../../services/matieres.service';

@Component({
  selector: 'app-dialog-admin-details-dossier',
  templateUrl: './dialog-admin-details-dossier.component.html',
  styleUrls: ['./dialog-admin-details-dossier.component.css']
})
export class DialogAdminDetailsDossierComponent implements OnInit {

  data: any;
  dossier: any;
  rn: any;
  notes: any[];
  constructor(
    private dialogRef: MatDialogRef<DialogAdminDetailsDossierComponent>, @Inject(MAT_DIALOG_DATA) data: any,
    private dossiersService: DossiersService,
    private relevesService: RelevesService,
    private matieresService: MatieresService,
    private notesService: NotesService,
  ) {
    this.data = data;
    this.notes = [];
  }

  ngOnInit(): void {
    this.getDossier();
  }

  getDossier() {
    this.dossiersService.getDossierById(this.data.id).subscribe((data) => {
      this.dossier = data;
      this.relevesService.getRNDossier(this.data.id).subscribe((rn) => {
        this.rn = rn;
        this.matieresService.allMatieresP(this.data.id_parcours).subscribe((matieres) => {
          if (matieres) {
            this.notes = [];
            matieres.forEach((matiere: any) => {
              this.notesService.getNote(this.data.id, matiere.matiereId).subscribe((n) => {
                let note = {
                  matiere: matiere,
                  note: n,
                }
                this.notes.push(note);
              });
            });
          }
        });
      });
    });
  }

  close() {
    let id = '#' + this.data.id;
    this.dialogRef.close(id);
  }

}
