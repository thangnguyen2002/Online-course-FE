import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Question} from "../../model/Question";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }
  getAllById(id:number):Observable<Question[]>{
    return this.http.get<Question[]>(API_URL+"/admin/question/"+id)
  }
  getAllByIdUser(id:number):Observable<Question[]>{
    return this.http.get<Question[]>(API_URL+"/user/question/"+id)
  }
  save(question:any,id:number):Observable<Question>{
    return this.http.post<Question>(API_URL+"/admin/question/"+id,question)
  }
  delete(id:number):Observable<Question>{
    return this.http.get<Question>(API_URL+"/admin/question/delete/"+id)
  }
}
