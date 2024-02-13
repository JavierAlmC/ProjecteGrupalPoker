import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Partida } from '../../interfaces/partida';

@Component({
  selector: 'app-view-rooms',
  standalone: true,
  templateUrl: './view-rooms.component.html',
  styleUrl: './view-rooms.component.css',
  imports: [MatTableModule, MatPaginatorModule],
})
export class ViewRoomsComponent implements OnInit {
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

  columnsToDisplay: string[] = ['id', 'players'];
  dataSource = new MatTableDataSource<Partida>(this.games);
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  constructor() {}

  ngOnInit(): void {
    // Asignar los datos al dataSource

    // Conectar el paginador al dataSource
    this.dataSource.paginator = this.paginator;
  }
}
