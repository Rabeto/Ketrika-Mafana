import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParcoursService } from '../../../services/parcours.service';

@Component({
  selector: 'app-dialog-parcours',
  templateUrl: './dialog-parcours.component.html',
  styleUrls: ['./dialog-parcours.component.css']
})
export class DialogParcoursComponent implements OnInit {
  parcours: any;
  constructor(
    private dialogRef: MatDialogRef<DialogParcoursComponent>, @Inject(MAT_DIALOG_DATA) data: any,
    private parcoursService: ParcoursService
  ) {
    this.parcours = this.parcoursService.getParcourById(data.id).subscribe((d) => {
      this.parcours = d;
    })
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
