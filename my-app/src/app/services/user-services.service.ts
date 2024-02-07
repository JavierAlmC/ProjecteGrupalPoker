import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../interfaces/auth-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private http: HttpClient) {
   }

  loginUser(nickname:string,password:string) : Observable<any> {
    const authData : AuthData = {
      nickname: nickname,
      password: password
    }
    return this.http.post('http://localhost:8090/login', authData);
  }
}
