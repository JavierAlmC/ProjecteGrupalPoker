import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { UserServicesService } from '../../services/user-services.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

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
  constructor(
    public userServices: UserServicesService,
    private matDialog: MatDialog,
  ) {}
  ngOnInit(): void {
    
    this.userServices.profile$.subscribe(profile => {
      this.description = profile;
    });
      this.userServices.getProfile();
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
  
  modifieAccount() {
    
    const dialogReff = this.matDialog.open(EditDialogComponent, {
      height: 'min-content',
      width: 'max-content',
      data: {
        title: 'Modifie',
        content: '',
      },
    });
  
    dialogReff.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Entra");

        this.NewInfo = result;
      }else{
        console.log("No entra");

      }
    });
  }
  

}

export interface Profile {
  nickname: string;
  nombre: string;
  email: string;
  balance: number; 
}