import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { UserServicesService } from '../../services/user-services.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [HeaderComponent, FooterComponent]
})
export class ProfileComponent implements OnInit{

  description: any;
  NewInfo: any;
  profileForm: FormGroup | any;

  constructor(
    public userServices: UserServicesService,
    private matDialog: MatDialog,
    private fb: FormBuilder,
  ) {}
  ngOnInit(): void {
    
    this.userServices.profile$.subscribe(profile => {
      this.description = profile;
    });
      this.userServices.getProfile();


      this.profileForm = this.fb.group({
        nickname: [this.description.nickname, Validators.required],
        nombre: [this.description.nombre, Validators.required],
        email: [this.description.email, [Validators.required, Validators.email]],
        saldo: [this.description.saldo, Validators.required],
        password: [this.description.password, Validators.required],
      });

      this.profileForm.disable();
  }

  deleteAccount() {

    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      height: 'min-content',
      width: 'max-content',
      data: {
        title: 'Are you sure to delete your account?',
        content: '',
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Eliminado");
        //this.userServices.deleteProfile();
      }else{
        console.log("No eliminado");
      }
    });
  
  }
  
  saveChanges(): void {
    if (this.profileForm.valid) {
      this.description = this.profileForm.value;

      this.profileForm.disable();

      this.userServices.editProfile();
    }
  }
  
}

export interface Profile {
  nickname: string;
  nombre: string;
  email: string;
  balance: number; 
}