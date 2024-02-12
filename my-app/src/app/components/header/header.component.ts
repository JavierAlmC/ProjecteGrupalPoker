import { Component } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuValue: boolean = false;

  menu_icon: string = 'bi bi-list';
  constructor(public userServices: UserServicesService, private router : Router){

  }
  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }
  logout(){
    console.log('entra')
    this.userServices.logOut();
    this.router.navigate(['']);
  }
}
