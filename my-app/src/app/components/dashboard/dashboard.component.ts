import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';
import { GameServicesService } from '../../services/game-services.service';

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
    this.userService.getProfile();
    this.userService.profile$.subscribe((profile) => {
      console.log(profile);
      console.log("Este es el perfil "+profile);
      this.description = profile;
      this.money = this.description.saldo;
      
    });
    
  }

  initial_money: number = 1000;
  total_bet = 32000;
  constructor(public userService :UserServicesService,public gameService: GameServicesService) {

  }
  

  calcularRendimiento(): number {
    return ((this.description.saldo - this.initial_money) / this.initial_money) * 100;
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
