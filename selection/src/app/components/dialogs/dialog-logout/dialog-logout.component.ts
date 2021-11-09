import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
declare var jQuery: any;

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.css']
})
export class DialogLogoutComponent implements OnInit {
  user: any;
  constructor(
    private userService: UsersService,
    private dialogRef: MatDialogRef<DialogLogoutComponent>
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.userService.getUserSession()
  }

  save() {
    (($) => {
      $("#k-animate-btn").css('display', 'block')
    })(jQuery);
    setTimeout(() => {
      (($) => {
        $("#k-animate-btn").css('display', 'none');
        $("#k-animate-btn-r").css({'display': 'block'});
        $("#k-animate-btn-r").css({'color': 'green'});
      })(jQuery);
      setTimeout(()=> {
        this.dialogRef.close(true);
      }, 3000);
    }, 7000);
  }

  close() {
    this.dialogRef.close();
  }
}
