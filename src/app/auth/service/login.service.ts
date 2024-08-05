import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Rating} from "../../model/Rating";
import {environment} from "../../../environments/environment";
import {AppUser} from "../../model/AppUser";
import {UserToken} from "../../model/UserToken";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(accLogin:any):Observable<UserToken>{
    return this.http.post<UserToken>(API_URL+"/login",accLogin)
  }
  register(register:any):Observable<any>{
    return this.http.post<any>(API_URL+"/register",register)
  }
  setToken(token: string){
    localStorage.setItem("token",token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  setUserToken(userToken: UserToken){
    localStorage.setItem("userToken",JSON.stringify(userToken));
  }

  getUserToken(): UserToken{
    return JSON.parse(<string>localStorage.getItem("userToken"));
  }


}

