import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAddParcoursComponent } from '../dialogs/dialog-add-parcours/dialog-add-parcours.component';
import { ParcoursService } from '../../services/parcours.service';
import { DialogUpdateParcoursComponent } from '../dialogs/dialog-update-parcours/dialog-update-parcours.component';
import { DialogDeleteConfirmationComponent } from '../dialogs/dialog-delete-confirmation/dialog-delete-confirmation.component';

@Component({
  selector: 'app-parcours',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.css']
})
export class ParcoursComponent implements OnInit {
  parcours: any[];

  constructor(
    private parcoursService: ParcoursService,
    private dialog: MatDialog
  ) {
    this.parcours = [];
  }

  ngOnInit(): void {
    this.allParcours();
  }

  /**ALL PARCOURS */
  allParcours() {
    this.parcoursService.allParcours().subscribe((data) => {
      this.parcours = data;
    });
  }

  /**ADD NEW PARCOURS */
  openDialogAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DialogAddParcoursComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        let newP = {
          parcoursEtab: data.etab,
          parcoursMention: data.mention,
          parcoursName: data.parcours,
          parcoursOrdre: this.parcours.length + 1
        }
        this.parcoursService.addParcours(newP).subscribe((data) => {
          this.allParcours();
        })
      }
    });
  }

  /**UPDATE PARCOURS */
  openDialogUpdate(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id
    };
    const dialogRef = this.dialog.open(DialogUpdateParcoursComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        let newP = {
          parcoursEtab: data.etab,
          parcoursMention: data.mention,
          parcoursName: data.parcours,
          parcoursOrdre: data.ordre
        }
        this.parcoursService.updateParcours(id, newP).subscribe((data) => {
          this.allParcours();
        })
      }
    });
  }

  /**DELETE PARCOURS */
  openDialogDelete(id: string, name: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      id: id,
      item: 'le Parcours',
      value: name
    };
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(id_ => {
      if (id_) {
        this.parcoursService.deleteParcours(id_).subscribe((data) => {
          this.allParcours();
        });
      }
    });
  }
}
