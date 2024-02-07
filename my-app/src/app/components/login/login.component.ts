import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserServicesService } from '../../services/user-services.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  isSubmitted = false;
  hide = true;

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

  constructor(private fb: FormBuilder, private matDialog: MatDialog, private router: Router, public userServices: UserServicesService) {}
  ngOnInit(): void {
    this.matDialog.open(MatDialogComponent, {
      height: 'min-content',
      width: 'max-content',
      data: {
        title: 'Confirm Your Age',
        content:
          'Welcome to our poker website! By confirming, you affirm that you are over 18 years old.',
      },
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
  
    if (this.loginForm.invalid) {
      return;
    } 
  
    const nickname = this.loginForm.value.nickname;
    const password = this.loginForm.value.password;
  
    if (nickname && password) {
      const user = { nickname: nickname, password: password };
      this.userServices.loginUser(user.nickname, user.password).subscribe((data) => {
        console.log(data);
        
      });
    } else {
      console.error("Nickname o contraseña no válidos");
    }
  }
  signUp(): void {

    this.router.navigate(['register']);


  }
}
