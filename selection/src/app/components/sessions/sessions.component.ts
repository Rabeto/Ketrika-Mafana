import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SessionsService } from '../../services/sessions.service';
import { DialogAddSessionComponent } from '../dialogs/dialog-add-session/dialog-add-session.component';
import { DialogWarningComponent } from '../dialogs/dialog-warning/dialog-warning.component';
import { DialogCloseSessionComponent } from '../dialogs/dialog-close-session/dialog-close-session.component';
import { DialogDeleteConfirmationComponent } from '../dialogs/dialog-delete-confirmation/dialog-delete-confirmation.component';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  sessions: any[];
  canAdd: boolean;
  constructor(
    private sessionsService: SessionsService,
    private dialog: MatDialog
  ) {
    this.sessions = [];
    this.canAdd = true;
  }

  ngOnInit(): void {
    this.allSessions();
  }

  /**ALL SESSIONS */
  allSessions() {
    this.sessionsService.allSessions().subscribe((data) => {
      this.sessions = data;
      if (data) {
        for (let i =0; i<data.length; i++){
          if (data[i].sessionStatus == 'O') {
            this.canAdd = false;
            break;
          } else {
            this.canAdd = true;
          }
        }
      }
    });
  }

  openDialogAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DialogAddSessionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        let newS = {
          sessionAnnee: data.annee,
          sessionDescription: data.desc,
          sessionStatus: 'O'
        }
        this.sessionsService.addSessions(newS).subscribe((data) => {
          this.allSessions();
        })
      }
    });
  }

  openDialogAddError() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      message: "Vous ne pouvez pas ajouter une nouvelle session tant que l'ancienne n'est pas encore fermée"
    };
    const dialogRef = this.dialog.open(DialogWarningComponent, dialogConfig);
  }

  closeSession(id: string, name: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      id: id,
      item: name
    };
    const dialogRef = this.dialog.open(DialogCloseSessionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(id_ => {
      if (id_) {
        this.sessionsService.closeSession(id_).subscribe((data) => {
          this.allSessions();
        });
      }
    });
  }

  openDialogDelete(id: string, name: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      id: id,
      item: 'la Session',
      value: name
    };
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(id_ => {
      if (id_) {
        this.sessionsService.deleteSession(id_).subscribe((data) => {
          this.allSessions();
        });
      }
    });
  }
}
