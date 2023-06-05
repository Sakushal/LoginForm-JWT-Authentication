import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Login } from '../login.model';
import { Signup } from '../signup.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

 

  constructor(private http:HttpClient) { }
  onLogin(loginData:any):Observable<any>{
    return this.http.post('http://192.168.3.104:85/api/Auth/login',loginData);
  }
}
