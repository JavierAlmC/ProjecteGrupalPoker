import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData, NewUser } from '../interfaces/auth-data.model';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { URL_LOCAL_PROXY} from '../environment/environment';
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
    return this.http.post('/auth/login', authData);
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
    return this.http.post('/auth/nuevo', userData,{headers : headers});
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
  getUserId(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
    const url = `/api/v1/infoPerfil/${this.getNickname()}`;
    return this.http.get<any>(url,{ headers: headers, responseType: 'json' });

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

/*
  private profileSubject = new BehaviorSubject<any>(null);
  profile$ = this.profileSubject.asObservable();
  */

  getProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
    const url = `/api/v1/infoPerfil/${this.getNickname()}`;
    return this.http.get<any>(url,{ headers: headers, responseType: 'json' });
  }

  deleteProfile():Observable<any>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json',
  });
     return this.http.delete<any>(`/api/v1/eliminarUsuario/${this.getNickname()}`, { headers: headers,responseType: 'json' });
  }

  editProfile(updatedProfile: any): void {
    const nickname = this.getNickname();
    const token = this.getToken();
  
    if (nickname && token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
  
      this.http.post(`/api/v1/modificarUsuario/${nickname}`, updatedProfile, { headers: headers }).subscribe(
        (resp: any) => {
          return resp;
        },
        (error) => {
          return error;
        }
      );
    }
  }
  getOrderBySalario(): Observable<any[]> {
    const nickname = this.getNickname();
    const token = this.getToken();
    if (nickname && token) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        });

        return this.http.get(`/api/v1/ordenadosPorSaldo`, { headers: headers }).pipe(
            map((resp: any) => {
                return resp.map((user: { nickname: any; saldo: any; }) => [user.nickname, user.saldo]);
            }),
            catchError((error) => {
                console.error(error);
                return [];
            })
        );
    }
    return of([]); 
  }

  getState(id: any): Observable<any[]> {
    const nickname = this.getNickname();
    const token = this.getToken();
    if (nickname && token) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        });

        return this.http.get(`/api/v1/game/${id}`, { headers: headers }).pipe(
            (resp: any) => {
              console.log(resp);
                return resp;
            },
            catchError((error) => {
                console.error(error);
                return [];
            })
        );
    }
    return of([]); 
  }

}