import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatieresService } from '../../services/matieres.service';
import { DialogAddMatiereComponent } from '../dialogs/dialog-add-matiere/dialog-add-matiere.component';
import { DialogDeleteConfirmationComponent } from '../dialogs/dialog-delete-confirmation/dialog-delete-confirmation.component';
import { DialogUpdateMatiereComponent } from '../dialogs/dialog-update-matiere/dialog-update-matiere.component';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {

  matieres: any;
  id_parcours: string | null;
  constructor(
    private matieresService: MatieresService,
    private dialog: MatDialog
  ) { 
    this.matieres = [];
    this.id_parcours = sessionStorage.getItem('parcours');
  }

  ngOnInit(): void {
    this.allMatieres();
  }

  allMatieres() {
    this.matieresService.allMatieres().subscribe((data) => {
      this.matieres = data;
    });
  }

  /**ADD NEW MATIERE */
  openDialogAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DialogAddMatiereComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        let newM = {
          matiereCode: data.code,
          matiereName: data.matiere,
          matiereCoeff: data.coeff
        }
        if (this.id_parcours != null) {
          this.matieresService.addMatieres(this.id_parcours, newM).subscribe((data) => {
            this.allMatieres();
          });
        }
      }
    });
  }

  /**UPDATE MATIERE */
  openDialogUpdate(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id
    };
    const dialogRef = this.dialog.open(DialogUpdateMatiereComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        let newM = {
          matiereCode: data.code,
          matiereName: data.matiere,
          matiereCoeff: data.coeff
        }
        this.matieresService.updateMatiere(id, newM).subscribe((data) => {
          this.allMatieres();
        })
      }
    });
  }

  /**DELETE MATIERE */
  openDialogDelete(id: string, name: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      id: id,
      item: 'la Matière',
      value: name
    };
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(id_ => {
      if (id_) {
        this.matieresService.deleteMatiere(id_).subscribe((data) => {
          this.allMatieres();
        });
      }
    });
  }
}
