import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    nickname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(private fb: FormBuilder, private matDialog: MatDialog) {}
  ngOnInit(): void {
    const dialogRef = this.matDialog.open(MatDialogComponent, {
        disableClose: true,
        height: '500px',
        width: '500px',
        data: {
        title: 'Confirm Your Age',
        content:
          'Welcome to our poker website! By logging in, you affirm that you are over 18 years old.',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    
  }

  onSubmit(): void {}
}
