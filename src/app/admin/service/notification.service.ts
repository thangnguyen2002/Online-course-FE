import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../../model/Notification";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }
  getAll(send:string):Observable<Notification[]>{
    return this.http.get<Notification[]>(API_URL+"/admin/notification/"+send)
  }
  getAllUser(send:string):Observable<Notification[]>{
    return this.http.get<Notification[]>(API_URL+"/user/notification/"+send)
  }
  doneNotification(notification:any):Observable<Notification>{
    return this.http.post<Notification>(API_URL+"/admin/notification/done",notification)
  }
  doneNotificationUser(notification:any):Observable<Notification>{
    return this.http.post<Notification>(API_URL+"/user/notification/done",notification)
  }
}
