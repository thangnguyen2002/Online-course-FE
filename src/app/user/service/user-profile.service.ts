import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AppUser} from "../../model/AppUser";
import {ChangeProfileUser} from "../../model/ChangeProfileUser";
import {ChangePassword} from "../../model/ChangePassword";
import {ChangeAvatar} from "../../model/ChangeAvatar";
import {Page} from "../../model/Page";
import {Wallet} from "../../model/Wallet";
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http:HttpClient) { }
  getProfile():Observable<AppUser>{
    return this.http.get<AppUser>(`${API_URL}/user`)
  }

  getProfiles(page:any):Observable<AppUser[]>{
    return this.http.get<AppUser[]>(`${API_URL}/course/showUser`)
  }
  getProfileFull(): Observable<ChangeProfileUser>{
      return this.http.get<ChangeProfileUser>(`${API_URL}/user`)
  }
  getAllPage(page:any):Observable<Page> {
    return this.http.get<Page>(API_URL + '/admin/showUser/'+page);
  }
  saveProfile(profile:any):Observable<ChangeProfileUser>{
    return this.http.post<ChangeProfileUser>(`${API_URL}/user/change-profile`,profile)
  }
  savePassword(changePassword:any):Observable<ChangePassword>{
    return this.http.post<ChangePassword>(`${API_URL}/user/change-password`,changePassword)
  }
  saveAvatar(changeAvatar:any):Observable<ChangeAvatar>{
    return this.http.post<ChangeAvatar>(`${API_URL}/user/change-avatar`,changeAvatar)
  }
  findById(idUser: number): Observable<AppUser> {
    console.log(this.http.get<AppUser>(`${API_URL}/appUsers/${idUser}`))
    return this.http.get<AppUser>(`${API_URL}/appUsers/${idUser}`);
  }

  disableUser(idUser: number):Observable<AppUser> {
    return  this.http.get<AppUser>(`${API_URL}/admin/disableUser/${idUser}`)

  }

  activatedUser(idUser:any):Observable<AppUser>{
    return this.http.get<AppUser>(`${API_URL}/admin/activatedUser/${idUser}`)
  }
  findWallet(): Observable<Wallet> {
    return this.http.get<Wallet>(`${API_URL}/wallet`);
  }
}
