import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.css']
})
export class DialogChangePasswordComponent implements OnInit {

  form: FormGroup;
  error: string;
  id: string | null;
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<DialogChangePasswordComponent>) {
    this.form = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      confPassword: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(32)]]
    });
    this.error = '';
    this.id = sessionStorage.getItem('id');
  }

  ngOnInit(): void {
    
  }

  save() {
    if (this.id != null) {
      if (this.form.value.newPassword === this.form.value.confPassword) {
        this.usersService.changePassword(this.id, this.form.value).subscribe((data) => {
          if (data.status == 'OK'){
            this.dialogRef.close()
          } else {
            this.error = 'Ancien mot de passe incorrect'
          }
        })
      } else {
        this.error = 'Mot de passe de confirmation incorrect';
      }
    }
  }

  formValid() {
    if (this.form.valid) {
      return true;
    } else {
      return false;
    }
  }

  close() {
    this.dialogRef.close();
  }

}
