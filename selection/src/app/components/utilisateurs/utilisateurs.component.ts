import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ParcoursService } from '../../services/parcours.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialogs/dialog-add-user/dialog-add-user.component';
import { DialogDeleteConfirmationComponent } from '../dialogs/dialog-delete-confirmation/dialog-delete-confirmation.component';
import { DialogParcoursComponent } from '../dialogs/dialog-parcours/dialog-parcours.component';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  //Attribut
  users: any[];

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private parcoursService: ParcoursService
    ) {
      this.users =  [];
     }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.allUsers().subscribe((data) => {
      this.users = data;
      this.users.forEach((u)=>{
        this.parcoursService.getParcourById(u.compteParcours).subscribe((p) => {
          u.parcours = p.parcoursName;
        })
      })
    })
  }

  openDialogAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DialogAddUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        let newC = {
          compteUsername: data.username,
          compteFullname: data.fullname,
          compteMail: data.mail,
          comptePassword: '0000'
        }
        this.usersService.addUser(data.parcours, newC).subscribe((data) => {
          this.getAllUsers();
        })
      }
    });
  }

  /**SHOW USER'S PARCOURS */
  showParcours(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      id: id
    };
    dialogConfig.width = '250';
    const dialogRef = this.dialog.open(DialogParcoursComponent, dialogConfig);
  }

  /**DELETE USER */
  deleteUser(id: string, name: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      id: id,
      item: 'l\'Utilisateur',
      value: name
    };
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(id_user => {
      if (id_user) {
        this.usersService.deleteUser(id_user).subscribe((data) => {
          this.getAllUsers();
        });
      }
    });
  }
}
