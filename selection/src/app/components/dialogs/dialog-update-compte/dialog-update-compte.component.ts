import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-compte',
  templateUrl: './dialog-update-compte.component.html',
  styleUrls: ['./dialog-update-compte.component.css']
})
export class DialogUpdateCompteComponent implements OnInit {

  form: FormGroup;
  id: string | null;
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<DialogUpdateCompteComponent>) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      fullname: ['', [Validators.required, Validators.minLength(4)]],
      mail: ['', [Validators.required, Validators.email]]
    });
    this.id = sessionStorage.getItem('id');
  }

  ngOnInit(): void {
    if (this.id) {
      this.usersService.getOneUser(this.id).subscribe((data)=>{
        this.form.setValue({
          username: data.compteUsername,
          fullname: data.compteFullname,
          mail: data.compteMail
        })
      });
    }
  }

  save() {
    let data = {
      id: this.id,
      compteUsername: this.form.value.username,
      compteFullname: this.form.value.fullname,
      compteMail: this.form.value.mail
    }
    this.dialogRef.close(data);
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
