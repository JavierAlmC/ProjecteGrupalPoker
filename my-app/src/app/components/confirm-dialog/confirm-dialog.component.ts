import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  standalone: true,
  imports: [MatCard,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions],
  template: `
  <h2 mat-dialog-title>{{ data.title }}</h2>
  <mat-dialog-content>{{ data.content }}</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)="onYesClick()">Yes</button>
    <button mat-button (click)="onNoClick()">No</button>
  </mat-dialog-actions>`,
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}