import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../../services/matches.service';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  description: any;
  money: number = 0; 
  ngOnInit(): void {
    
    this.userServicesService.profile$.subscribe(profile => {
      console.log("Este es el perfil "+profile);
      this.description = profile;
      this.money = this.description.saldo;
      
    });
    
  }

  initial_money: number = 1000;
  total_bet = 0;

  constructor(private matchesService: MatchesService, private userServicesService: UserServicesService) {
  
  }

  calcularRendimiento(): number {
    return ((this.description.saldo - this.initial_money) / this.initial_money) * 100;
  }
}
