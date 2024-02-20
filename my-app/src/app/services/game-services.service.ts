import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserServicesService } from './user-services.service';

@Injectable({
  providedIn: 'root'
})
export class GameServicesService {

  constructor( public userService: UserServicesService, private http: HttpClient) { }
  public newGame(idUser:Number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    const url = `/api/v1/newGame/${idUser}`;
    return this.http.post<any>(url,{ headers: headers, responseType: 'json' });
  }
}
