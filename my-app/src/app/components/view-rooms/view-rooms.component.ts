
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Partida } from '../../interfaces/partida';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TablePaginationService } from '../../services/table-pagination.service';
import { Game } from '../../interfaces/game-table-model';
import { Observable, forkJoin, map } from 'rxjs';
import { UserServicesService } from '../../services/user-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-rooms',
  standalone: true,
  templateUrl: './view-rooms.component.html',
  styleUrl: './view-rooms.component.css',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButton,
    MatProgressBarModule,
  ],
})
export class ViewRoomsComponent {
  isLoading: boolean = false;
  idGame?: number;
  totalData: number = 0;
  gamesData: Game[] = [];
  pageSizes = [5, 10, 20];
  columnsToDisplay: string[] = ['id', 'players', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Game>();

  constructor(public gamesService: TablePaginationService, public userService : UserServicesService,     
    private router: Router,
    ) {}

  fetchTableData(currentPage: number, pageSize: number) {
    this.gamesService.getGames(currentPage, pageSize).subscribe((gamesData) => {
      console.log(gamesData);
      this.totalData = gamesData.totalItems;
      this.gamesData = gamesData.data;
      console.log(this.gamesData)
      this.gamesData.map((game, index) => {
        this.idGame = game.idState;
        this.gamesService.getPlayers(this.idGame).subscribe((players) => {
          this.gamesData[index].players = players.players;
          console.log(this.gamesData[index])
        })
      })
      this.dataSource = new MatTableDataSource(this.gamesData);
    });
  }
  ngOnInit() {
    this.gamesService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator = this.paginator;
    setInterval(() => {
      this.fetchTableData(this.paginator.pageIndex, this.paginator.pageSize);
    }, 2000);
   
  }
  /*
  ngOnInit(): void {
    
    this.dataSource.paginator = this.paginator;
  }
  */
  join(idState: number) {
    
    this.userService.getUserId().subscribe((infoUser) => {
      console.log(infoUser)
      console.log(isNaN(
        infoUser.id
      ))
      this.gamesService.joinGame(idState, infoUser.id).subscribe((data) => {
        console.log(data)
          
      })
      
    })
    /*
  this.gamesService.joinGame(idState,this.userService.)
  */
  this.router.navigate(['board']);    
  }
  
}






