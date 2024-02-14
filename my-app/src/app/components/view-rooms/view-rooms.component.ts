import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Partida } from '../../interfaces/partida';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TablePaginationService } from '../../services/table-pagination.service';
import {
  BehaviorSubject,
  catchError,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { Games } from '../../interfaces/game-table-model';
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

  totalData: number = 0;
  gamesData: Games[] = [];
  games: Partida[] = [
    { id: '1', players: 'Juan' },
    { id: '2', players: 'María' },
    { id: '3', players: 'Pedro' },
    { id: '1', players: 'Juan' },
    { id: '2', players: 'María' },
    { id: '3', players: 'Pedro' },
    { id: '1', players: 'Juan' },
    { id: '2', players: 'María' },
    { id: '3', players: 'Pedro' },
    { id: '1', players: 'Juan' },
    { id: '2', players: 'María' },
    { id: '3', players: 'Pedro' },
  ];
  pageSizes = [5, 10, 20];
  columnsToDisplay: string[] = ['id', 'players', 'actions'];
  dataSource = new MatTableDataSource<Games>();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  constructor(public gamesService: TablePaginationService) {}

  getTableData(currentPage: Number, pageSize: Number) {
    return this.gamesService.getGames(currentPage, pageSize);
  }
  ngAfterViewInit() {
    this.gamesService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.getTableData(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => of(null)));
        }),
        map((gamesData) => {
          if (gamesData == null) return [];
          this.totalData = gamesData.totalItems;
          return gamesData.data;
        })
      )
      .subscribe((gamesData) => {
        this.gamesData = gamesData;
        this.dataSource = new MatTableDataSource(this.gamesData);
      });
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
