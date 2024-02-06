import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-mat-dialog',
  standalone: true,
  imports: [MatCard],
  templateUrl: './mat-dialog.component.html',
  styleUrl: './mat-dialog.component.css',
})
export class MatDialogComponent implements OnInit {

  dataDialog: any = {title: '', content: ''};
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; content: string }
  ) {}
  ngOnInit(): void {
    console.log(this.data)
    this.dataDialog = this.data;
  }
}
