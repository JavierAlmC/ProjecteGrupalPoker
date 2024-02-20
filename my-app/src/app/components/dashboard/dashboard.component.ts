import { Component } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';
import { GameServicesService } from '../../services/game-services.service';

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
  constructor(public userService :UserServicesService,public gameService: GameServicesService) {

  }
  

  calcularRendimiento(): number {
    return ((this.money - this.initial_money) / this.initial_money) * 100;
  }
  createGame(){
    this.userService.getUserId().subscribe((data)=>{
      if(data.gameStateDb !== null || data.idCreatedGame !== null){
        
      }else{
        //si algun dels dos es null, crea
        this.gameService.newGame(data.id).subscribe((data)=>{
          console.log(data)
        })

      }
    })
  
  }
}
