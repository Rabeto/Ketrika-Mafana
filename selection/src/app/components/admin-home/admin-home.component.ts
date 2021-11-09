import { Component, OnInit } from '@angular/core';
import { ParcoursService } from '../../services/parcours.service';
import { SessionsService } from '../../services/sessions.service';
import { DossiersService } from '../../services/dossiers.service'; 
import { RelevesService } from '../../services/releves.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAdminDetailsDossierComponent } from '../dialogs/dialog-admin-details-dossier/dialog-admin-details-dossier.component';
declare var jQuery: any;

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  selectedParcours: string;
  selectedSession: string;
  sessions: any[];
  parcours: any[];
  dossiers: any[];
  constructor(
    private parcoursService: ParcoursService,
    private sessionsService: SessionsService,
    private dossiersService: DossiersService,
    private relevesService: RelevesService,
    private dialog: MatDialog
  ) {
    this.selectedParcours = 'all';
    this.selectedSession = '';
    this.parcours = [];
    this.sessions = [];
    this.dossiers = [];
  }

  ngOnInit(): void {
    this.parcoursService.allParcours().subscribe((data) => {
      this.parcours = data;
    })
    this.allSessions();
    setTimeout(() => {
      this.allDossiers();
    }, 1000);
  }

  /**GET SESSIONS */
  allSessions() {
    this.sessionsService.allSessions().subscribe((data) => {
      this.sessions = data;
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].sessionStatus == 'O') {
            this.selectedSession = data[i].sessionId;
            break;
          } else {
            this.selectedSession = data[data.length - 1].sessionId;
          }
        }
      }
    });
  }

  /**ALL DOSSIERS */
  allDossiers() {
    if (this.selectedSession) {
      if (this.selectedParcours != 'all') {
        this.dossiersService.allDossiers(this.selectedParcours, this.selectedSession).subscribe((data) => {
          if (data) {
            this.dossiers = data;
            this.dossiers.forEach((d: any) => {
              this.relevesService.getRNDossier(d.dossierId).subscribe((rn) => {
                d.rn = rn;
              });
              this.parcoursService.getParcourById(d.dossierParcour).subscribe((p) => {
                d.parcours = p.parcoursName;
              })
            });
          }
        });
      } else {
        this.dossiersService.allDossiersAllParcours(this.selectedSession).subscribe((data) => {
          if (data) {
            this.dossiers = data;
            this.dossiers.forEach((d: any) => {
              this.relevesService.getRNDossier(d.dossierId).subscribe((rn) => {
                d.rn = rn;
              });
              this.parcoursService.getParcourById(d.dossierParcours).subscribe((p) => {
                d.parcours = p.parcoursName;
              })
            });
          }
        });
      }
    }
  }

  changeParcours() {
    this.allDossiers();
  }

  changeSession() {
    this.allDossiers();
  }

  showDetails(id: string, id_parcours: string) {
    let id_ = "#" + id;
    (($) => {
      $(id_).css('transform', 'rotate(180deg)');
    })(jQuery);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      id: id,
      id_parcours: id_parcours
    };
    const dialogRef = this.dialog.open(DialogAdminDetailsDossierComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((d) => {
      (($) => {
        $(d).css('transform', 'rotate(360deg)');
      })(jQuery);
    });
  }
}
