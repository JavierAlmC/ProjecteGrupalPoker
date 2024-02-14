import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  isSubmitted = false;
  hide = true;
  hideC = true;

  registerForm = this.fb.group(
    {
      nickname: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.matchValidator('password', 'confirmPassword'),
    }
  );

  matchValidator(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (
        matchingControl!.errors &&
        !matchingControl!.errors?.['confirmedValidator']
      ) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: 'Passwords do not match' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private router: Router,
    public userServices: UserServicesService,
    @Inject(ToastrService) private toastr: ToastrService
  ) {}

  onSubmit() {
    this.isSubmitted = true;
    /*if (this.userServices.isLoggedIn()) {
      this.toastr.warning('User already logged in', 'Warning', {
        easing: 'ease-out',
        timeOut: 2000,
      });
      this.router.navigate(['rooms']);
      return;
    }*/

    if (this.registerForm.invalid) {
      this.toastr.warning('Please fill in all fields correctly', 'Warning', {
        easing: 'ease-out',
        timeOut: 2000,
      });
      return;
    }
    const nickname = this.registerForm.value.nickname;
    const nombre = this.registerForm.value.nombre;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    if (nickname && password && nombre && email) {
      const user = { nickname: nickname, nombre: nombre, email: email, password: password };
      this.userServices.createUser(user.nickname, user.nombre, user.email, user.password).subscribe({
        next: (response) => {
          console.log(response)
          this.toastr.success('Registration successful', 'Success', {
            easing: 'ease-out',
            timeOut: 2000,
          });
          this.router.navigate(['login']);
        },
        error: (error) => {
          this.toastr.error('Registration failed', 'Error', {
            easing: 'ease-out',
            timeOut: 2000,
          });
        }
      })
    }
  }
  login() {
    this.router.navigate(['']);
  }
}
