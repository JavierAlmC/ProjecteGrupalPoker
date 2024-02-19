import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Partida } from '../../interfaces/partida';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TablePaginationService } from '../../services/table-pagination.service';
import { Game } from '../../interfaces/game-table-model';
import { Observable, forkJoin, map } from 'rxjs';

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

  constructor(public gamesService: TablePaginationService) {}

  fetchTableData(currentPage: number, pageSize: number) {
    this.gamesService.getGames(currentPage, pageSize).subscribe((gamesData) => {
      console.log(gamesData);
      this.totalData = gamesData.totalItems;
      this.gamesData = gamesData.data;
      this.gamesData.map((game, index) => {
        this.idGame = game.idGame;
        this.gamesService.getPlayers(this.idGame).subscribe((players) => {
          this.gamesData[index].players = players.players;
          console.log(this.gamesData[index])
        })
      })
      this.dataSource = new MatTableDataSource(this.gamesData);
    });
  }
  ngAfterViewInit() {
    this.gamesService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.dataSource.paginator = this.paginator;

    this.fetchTableData(this.paginator.pageIndex, this.paginator.pageSize);
  }
  /*
  ngOnInit(): void {
    
    this.dataSource.paginator = this.paginator;
  }
  */
  join(id: string) {
    console.log(id);
  }
}
