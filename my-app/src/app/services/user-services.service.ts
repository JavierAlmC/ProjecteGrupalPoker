import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData, NewUser } from '../interfaces/auth-data.model';
import { BehaviorSubject, Observable } from 'rxjs';
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
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/json', // example content-type header
      Authorization: 'Bearer ',
      // example Authorization header
      // Add more headers as needed
    });*/
    return this.http.post(URL_SPRING + 'auth/login', authData);
  }

  createUser(nickname: string, nombre: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    const userData: NewUser = {
      nickname: nickname,
      nombre: nombre,
      email: email,
      password: password,
      roles : ["user"],
    };
    return this.http.post(URL_SPRING + 'auth/nuevo', userData,{headers : headers});
  }
  setToken(token: string) {
    //1 dia
    const expirationDate = new Date(Date.now() + 86400 * 1000).toUTCString();
    document.cookie = `token=${token}; Expires=${expirationDate}; SameSite=Strict;`;
  }

  getToken() {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
    return token || null;
  }
  setNickname(nickname: string) {
    const expirationDate = new Date(Date.now() + 86400 * 1000).toUTCString();
    document.cookie = `nickname=${nickname}; Expires=${expirationDate}; SameSite=Strict;`;
  }
  getNickname() {
    const nickname = document.cookie
      .split('; ')
      .find((row) => row.startsWith('nickname='))
      ?.split('=')[1];
    return nickname || null;
  }
  isLoggedIn() {
    console.log(this.getToken());
    return this.getToken() !== null;
  }
  logOut() {
    document.cookie =
      'token=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict;';
    document.cookie =
      'nickname=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict;';
  }


  private profileSubject = new BehaviorSubject<any>(null);
  profile$ = this.profileSubject.asObservable();

  getProfile(){
    const nickname = this.getNickname();
    const token = this.getToken();
  
    if (nickname && token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
  
      this.http.get("http://localhost:8090/auth/infoPerfil/" + nickname, { headers: headers }).subscribe(
        (resp: any) => {
          console.log(resp)
          return this.profileSubject.next(resp);
        },
        (error) => {
          return error;
        }
      );
  }
  }

  deleteProfile(){
    const nickname = this.getNickname();
    const token = this.getToken();
  
    if (nickname && token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
  
      this.http.get("http://localhost:8090/auth/eliminarUsuario/" + nickname, { headers: headers }).subscribe(
        (resp: any) => {
          return resp;
        },
        (error) => {
          return error;
        }
      );
  }
  }
}