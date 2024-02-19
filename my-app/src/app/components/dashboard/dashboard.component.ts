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
  money: number = 0; 
  
  ngOnInit(): void {
    const nickname = this.userServicesService.getNickname() || '';
    
    this.matchesService.getUserMoney(nickname).subscribe(
      (money: number) => {
        this.money = money;
      },
      (error: any) => {
        console.error('Error al obtener el dinero del usuario:', error);
        
      }
    );
  }

  initial_money: number = 1000;
  total_bet = 0;

  constructor(private matchesService: MatchesService, private userServicesService: UserServicesService) {
    
  }

  calcularRendimiento(): number {
    return ((this.money - this.initial_money) / this.initial_money) * 100;
  }
}
