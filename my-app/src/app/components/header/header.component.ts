import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../../services/user-services.service';


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
  constructor(private router: Router, private userServicesService: UserServicesService) {} 

  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }
  navigateToProfile() { 
    this.router.navigate(['/profile']);
  }
  logout() {
    this.userServicesService.logOut();
    this.router.navigate(['/']);
  }
  navigateToRooms() { 
    this.router.navigate(['/rooms']);
  }
}
