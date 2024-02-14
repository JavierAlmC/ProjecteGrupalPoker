import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isSubmitted = false;
  hide = true;

  loginForm = this.fb.group({
    nickname: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private router: Router,
    public userServices: UserServicesService,
    @Inject(ToastrService) private toastr: ToastrService
  ) {}
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
    //si ja està loggejat, pero te demencia i no sen recorda, el redirigim...
    if (this.userServices.isLoggedIn()) {
      this.toastr.warning('User already logged in', 'Warning', {
        easing: 'ease-out',
        timeOut: 2000,
      });
      this.router.navigate(['rooms']);
      return;
    }

    if (this.loginForm.invalid) {
      this.toastr.warning('Please fill in all fields correctly', 'Warning', {
        easing: 'ease-out',
        timeOut: 2000,
      });
      return;
    }
    const nickname = this.loginForm.value.nickname;
    const password = this.loginForm.value.password;

    if (nickname && password) {
      const user = { nickname: nickname, password: password };
      this.userServices.loginUser(user.nickname, user.password).subscribe({
        next: (response) => {
          console.log(response)
          this.toastr.success('Login successful', 'Success', {
            easing: 'ease-out',
            timeOut: 2000,
          });
          this.userServices.setToken(response.token);
          console.log(this.userServices.getToken());
          this.userServices.setNickname(response.nickname);
          console.log(this.userServices.getNickname());
          this.router.navigate(['rooms']);
        },
        error: (error) => {
          this.toastr.error('Login failed', 'Error', {
            easing: 'ease-out',
            timeOut: 2000,
          });
        },
      });
    }
  }
  signUp(): void {
    this.router.navigate(['register']);
  }
  
}
