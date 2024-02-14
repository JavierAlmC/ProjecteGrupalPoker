import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { GameTable } from '../interfaces/game-table-model';
import { URL_SPRING } from '../environment/environment';
import { UserServicesService } from './user-services.service';
@Injectable({
  providedIn: 'root',
})
export class TablePaginationService implements HttpInterceptor {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private http: HttpClient,
    private userService: UserServicesService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }
  public getGames(
    currentPage: Number,
    pageSize: Number
  ): Observable<GameTable> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken()}`,
    });
    const url = `/api/v1/partidas?page=${currentPage}&size=${pageSize}`;
    return this.http.get<GameTable>(url, { headers: headers });
  }
}
export class InterceptorService implements HttpInterceptor {
  constructor(public paginationService: TablePaginationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.paginationService.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(() => {
        this.paginationService.isLoading.next(false);
      })
    );
  }
}
