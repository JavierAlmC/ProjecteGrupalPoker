import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';
import { GameServicesService } from '../../services/game-services.service';
import { compileInjectable } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  description: any = {};
  money: number = 0; 
  initial_money: number = 1000;
  total_bet = 32000;
  profile:any = {};

  ngAfterViewInit() {
    console.log("Enters ngOnInit");
    this.userService.getUserId().subscribe((data)=>{
      console.log(data);
        console.log("Received profile response:", data);
        this.profile = data;
        this.description = data;
        this.money = this.description.saldo;
      
    });
  }
  

  
  constructor(public userService :UserServicesService,public gameService: GameServicesService) {

  }
  

  calcularRendimiento(): number {
    return ((this.description.saldo - this.initial_money) / this.initial_money) * 100;
  }
  createGame(){
    this.userService.getUserId().subscribe((data)=>{
      console.log(data);
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
