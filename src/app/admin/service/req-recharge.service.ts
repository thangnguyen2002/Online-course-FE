import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../../model/Question";
import {environment} from "../../../environments/environment";
import {RequestRecharge} from "../../model/RequestRecharge";
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ReqRechargeService {

  constructor(private http:HttpClient) { }
  getAll():Observable<RequestRecharge[]>{
    return this.http.get<RequestRecharge[]>(API_URL+"/admin/requestRecharge")
  }
  reCharge(recharge:any):Observable<any>{
    return this.http.post<any>(API_URL+"/wallet/recharge",recharge)
  }
  reqRecharge(money:any):Observable<any>{
    return this.http.post<any>(API_URL+"/wallet/reqRecharge",money)
  }
  reqRechargeVNPAY(money:any):Observable<any>{
    return this.http.post<any>(API_URL+"/api/pay/vnpay/" + money.money,{a:1})
  }
  getAllbyUser():Observable<RequestRecharge[]>{
    return this.http.get<RequestRecharge[]>(API_URL+"/admin/reqRechardUser")
  }
  delete(idReq:number):Observable<any>{
    return this.http.get<any>(API_URL+"/admin/deleteReq/"+idReq)
  }
  deleteUser(idReq:number):Observable<any>{
    return this.http.get<any>(API_URL+"/admin/deleteRedUser/"+idReq)
  }
}
