import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { ParcoursService } from './../../services/parcours.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogLogoutComponent } from '../dialogs/dialog-logout/dialog-logout.component';
import { DialogChangePasswordComponent } from '../dialogs/dialog-change-password/dialog-change-password.component';
import { DialogUpdateCompteComponent } from '../dialogs/dialog-update-compte/dialog-update-compte.component';
//import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var jQuery: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  id_p: string | null;
  id_u: string | null;
  parcour: any;
  user: any;
  constructor(
    private usersService: UsersService,
    private parcoursService: ParcoursService,
    private dialog: MatDialog
  ) { 
    this.id_p = sessionStorage.getItem('parcours');
    this.id_u = sessionStorage.getItem('id');
  }

  ngOnInit(): void {
    (($) => {
      $(document).ready(() => {
        $('#content-collapse').mouseleave(() => {
          setTimeout(() => {
            $('#btn-apps').click();
          }, 1000);
        });
        window.onscroll = function() {
          if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
            $('#navbar').addClass('shadow-48');
          } else {
            $('#navbar').removeClass('shadow-48');
          }
        }
      });
    })(jQuery);
    if (this.id_p != null) {
      this.parcoursService.getParcourById(this.id_p).subscribe((data)=>{
        this.parcour = data;
      })
    }
    if (this.id_u != null) {
      this.usersService.getOneUser(this.id_u).subscribe((data) => {
        this.user = data;
      })
    }
  }

  deconnecter() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(DialogLogoutComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.usersService.removeUserSession();
        setTimeout(() => {
          location.reload();
        }, 200);
      }
    });
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, dialogConfig);
  }

  updateCompte() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(DialogUpdateCompteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.usersService.updateUser(data.id, data).subscribe((data) => {

        })
      }
    })
  }
}
