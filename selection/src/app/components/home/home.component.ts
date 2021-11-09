import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../../services/sessions.service';
import { DossiersService } from '../../services/dossiers.service';
import { RelevesService } from '../../services/releves.service';
import { NotesService } from '../../services/notes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogDetailsDossierComponent } from '../dialogs/dialog-details-dossier/dialog-details-dossier.component';
import { DialogAddDossierComponent } from '../dialogs/dialog-add-dossier/dialog-add-dossier.component';
import { DialogAddNotesComponent } from '../dialogs/dialog-add-notes/dialog-add-notes.component';
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedSession: string;
  sessions: any[];
  canAdd : boolean;
  id_parcours: string | null;
  dossiers: any[];
  numInscNew: string;

  constructor(
    private sessionsService: SessionsService,
    private dossiersService: DossiersService,
    private relevesService: RelevesService,
    private notesService: NotesService,
    private dialog: MatDialog
  ) {
    this.selectedSession = "";
    this.sessions = [];
    this.dossiers = [];
    this.canAdd = false;
    this.id_parcours = sessionStorage.getItem('parcours');
    this.numInscNew = '';
   }

  ngOnInit(): void {
    this.allSessions();
    setTimeout(()=> {
      this.allDossiers();
    }, 1000);
  }

  /**CHANGE SESSION */
  changeSession() {
    this.allDossiers();
  }

  /**GET SESSIONS */
  allSessions() {
    this.sessionsService.allSessions().subscribe((data) => {
      this.sessions = data;
      if (data) {
        for (let i =0; i<data.length; i++){
          if (data[i].sessionStatus == 'O') {
            this.canAdd = true;
            this.selectedSession = data[i].sessionId;
            break;
          } else {
            this.canAdd = false;
            this.selectedSession = data[data.length - 1].sessionId;
          }
        }
      }
    });
  }

  /**ALL DOSSIERS */
  allDossiers() {
    if (this.selectedSession != "" && this.id_parcours != null) {
      this.dossiersService.allDossiers(this.id_parcours, this.selectedSession).subscribe((data) => {
        if (data) {
          if (data.length > 1) {
            this.numInscNew = (Number(data[data.length - 1].dossierNumInscription) + 1).toString();
          }
          this.dossiers = data;
          this.dossiers.forEach((d:any) => {
            this.relevesService.getRNDossier(d.dossierId).subscribe((rn) => {
              d.rn = rn;
            });
          });
        }
      });
    }
  }

  showDetails(id:string) {
    let id_ = "#"+ id;
    (($) => {
      $(id_).css('transform', 'rotate(180deg)');
    })(jQuery);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      id: id
    };
    const dialogRef = this.dialog.open(DialogDetailsDossierComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((d)=>{
      (($) => {
        $(id_).css('transform', 'rotate(360deg)');
      })(jQuery);
    });
  }

  openDialogAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    const dialogRef = this.dialog.open(DialogAddDossierComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        data.dossier.dossierNumInscription = this.numInscNew;
        if (this.id_parcours != null) {
          this.dossiersService.addDossiers(this.id_parcours, this.selectedSession, data.dossier).subscribe((dossier) => {
            if (dossier) {
              this.relevesService.addRNDossier(dossier.dossierId, data.releve).subscribe((rn) => {
                this.openDialogAddNotes(dossier.dossierId);
              });
            }
          });
        }
      }
    });
  }

  openDialogAddNotes(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      id: id
    };
    const dialogRef = this.dialog.open(DialogAddNotesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        for (let key in data) {
          let note = {
            noteValue: data[key]
          }
          this.notesService.updateNote(key, note).subscribe((d) => {
            
          });
        }
        setTimeout(()=> {
          this.allDossiers();
        }, 2000);
      }
    });
  }
}
