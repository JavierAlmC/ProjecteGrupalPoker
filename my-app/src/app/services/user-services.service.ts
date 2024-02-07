import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../interfaces/auth-data.model';
import { Observable } from 'rxjs';
import { URL_SPRING } from '../environment/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  constructor(private http: HttpClient) {}

  loginUser(nickname: string, password: string): Observable<any> {
    const authData: AuthData = {
      nickname: nickname,
      password: password,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // example content-type header
      'Authorization' : 'Bearer '
      // example Authorization header
      // Add more headers as needed
    });
    return this.http.post(URL_SPRING + 'auth/login', authData);
  }
  setToken(token : string) {
    //1 dia
    const expirationDate = new Date(Date.now() + 86400 * 1000).toUTCString();
    document.cookie = `token=${token}; Expires=${expirationDate}; SameSite=Strict;`;
  }

  getToken() {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    return token || null; 
  }
  setNickname(nickname : string){
    const expirationDate = new Date(Date.now() + 86400 * 1000).toUTCString();
    document.cookie = `nickname=${nickname}; Expires=${expirationDate}; SameSite=Strict;`;
  }
  getNickname(){
    const nickname = document.cookie
      .split('; ')
      .find(row => row.startsWith('nickname='))
      ?.split('=')[1];
    return nickname || null;
  }
  isLoggedIn(){
    return this.getToken();
  }
}
