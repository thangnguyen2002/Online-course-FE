import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rating} from "../../model/Rating";
import {environment} from "../../../environments/environment";
import {Bill} from "../../model/Bill";
import {TotalBillInMonth} from "../../model/TotalBillInMonth";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AdminBillService {

  constructor(private http:HttpClient) { }
  getAll():Observable<Bill[]>{
    return this.http.get<Bill[]>(API_URL+"/bill/allBill")
  }
  getAllByIdCourse(idCourse:number):Observable<Bill[]>{
    return this.http.get<Bill[]>(API_URL+"/bill/billCourse/"+idCourse)
  }
  getAllByIdUser():Observable<Bill[]>{
    return this.http.get<Bill[]>(API_URL+"/bill/billUser")
  }
  getTotalBillInMonth():Observable<TotalBillInMonth>{
    return this.http.get<TotalBillInMonth>(API_URL+"/bill/totalBillInMonth")
  }
}
