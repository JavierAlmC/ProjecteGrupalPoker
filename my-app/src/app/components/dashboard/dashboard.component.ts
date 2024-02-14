import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  money: number = 10000;
  initial_money: number = 1000;
  total_bet = 32000;

  calcularRendimiento(): number {
    return ((this.money - this.initial_money) / this.initial_money) * 100;
  }
}
