import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { UserServicesService } from '../../services/user-services.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [HeaderComponent, FooterComponent,ReactiveFormsModule,MatCard,MatButtonModule]
})
export class ProfileComponent implements OnInit{

  description: any;
  NewInfo: any;
  profileForm!: FormGroup;

  constructor(
    public userServices: UserServicesService,
    private matDialog: MatDialog,
    private fb: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.userServices.profile$.subscribe(profile => {
      this.description = profile;
    });
    console.log("DESCRIPCION"+this.description);
    this.userServices.getProfile();
   
  
    this.profileForm = this.fb.group(
      {
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        
      });
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
        this.userServices.deleteProfile();
      }else{
        console.log("No eliminado");
      }
    });
  
  }
  saveChanges(): void {
  

  const nombre = this.profileForm.value.nombre;
  const email = this.profileForm.value.email;

  const updatedProfile = {
    nombre: nombre,
    email: email,
  };
  
  console.log(updatedProfile);
  this.userServices.editProfile(updatedProfile);
    
  }
  
}

export interface Profile {
  nickname: string;
  nombre: string;
  email: string;
  saldo: number; 
}