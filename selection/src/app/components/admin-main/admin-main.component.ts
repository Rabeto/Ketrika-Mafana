import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { DialogChangePasswordComponent } from '../dialogs/dialog-change-password/dialog-change-password.component';
import { DialogLogoutComponent } from '../dialogs/dialog-logout/dialog-logout.component';
declare var jQuery: any;

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    (($) => {
      $(document).ready(() => {
        $('#content-collapse').mouseleave(() => {
          setTimeout(() => {
            $('#btn-apps').click();
          }, 1000);
        });
        window.onscroll = function () {
          if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
            $('#navbar').addClass('shadow-48');
          } else {
            $('#navbar').removeClass('shadow-48');
          }
        }
      });
    })(jQuery);
  }

  deconnecter() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(DialogLogoutComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.userService.removeUserSession();
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

}
