import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';


@Component({
  selector: 'app-mat-dialog',
  standalone: true,
  imports: [MatCard,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions],
  templateUrl: './mat-dialog.component.html',
  styleUrl: './mat-dialog.component.css',
})
export class MatDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; content: string }, private dialogRef: MatDialogRef<MatDialogComponent>
  ) {}
  ngOnInit(): void {
   
  }
  accept(){
    this.dialogRef.close();
  }
  decline(){
    window.location.href = 'https://www.rtve.es/infantil/';
  }
}
