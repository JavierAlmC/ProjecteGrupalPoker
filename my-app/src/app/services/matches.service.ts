import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServicesService } from './user-services.service';
@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  constructor(
    private http: HttpClient,
    private userService: UserServicesService
  ) {}

  public getUserMoney(nickname:string): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`,
      'Content-Type': 'application/json',
    });
    const url = `/api/v1/${this.userService.getNickname()}`;
    return this.http.get<number>(url, { headers: headers, responseType: 'json' });
  }
}