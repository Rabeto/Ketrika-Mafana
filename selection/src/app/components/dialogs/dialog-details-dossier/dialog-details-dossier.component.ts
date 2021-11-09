import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DossiersService } from '../../../services/dossiers.service';
import { RelevesService } from '../../../services/releves.service';
import { NotesService } from '../../../services/notes.service';
import { MatieresService } from '../../../services/matieres.service';
import { DialogUpdateNoteComponent } from '../dialog-update-note/dialog-update-note.component';

@Component({
  selector: 'app-dialog-details-dossier',
  templateUrl: './dialog-details-dossier.component.html',
  styleUrls: ['./dialog-details-dossier.component.css']
})
export class DialogDetailsDossierComponent implements OnInit {

  data: any;
  dossier: any;
  rn: any;
  notes: any[];
  constructor(
    private dialogRef: MatDialogRef<DialogDetailsDossierComponent>, @Inject(MAT_DIALOG_DATA) data: any,
    private dossiersService: DossiersService,
    private relevesService: RelevesService,
    private matieresService: MatieresService,
    private notesService: NotesService,
    private dialog: MatDialog
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
        this.matieresService.allMatieres().subscribe((matieres)=> {
          if (matieres){
            this.notes = [];
            matieres.forEach((matiere: any) => {
              this.notesService.getNote(this.data.id, matiere.matiereId).subscribe((n)=>{
                let note = {
                  matiere : matiere,
                  note : n,
                }
                this.notes.push(note);
              });
            });
          }
        });
      });
    });
  }

  getNotes() {
    this.matieresService.allMatieres().subscribe((matieres)=> {
      if (matieres){
        this.notes = [];
        matieres.forEach((matiere: any) => {
          this.notesService.getNote(this.data.id, matiere.matiereId).subscribe((n)=>{
            let note = {
              matiere : matiere,
              note : n,
            }
            this.notes.push(note);
          });
        });
      }
    });
  }

  update(id:string, mat: string, val: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
      matiere: mat,
      value: val
    };
    const dialogRef = this.dialog.open(DialogUpdateNoteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        let note = {
          noteValue: data.note
        }
        this.notesService.updateNote(id, note).subscribe((d) => {
          this.getNotes();
        });
      }
    });
  }

  close() {
    this.dialogRef.close(2);
  }

}
