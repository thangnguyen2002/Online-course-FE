import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../../model/Question";
import {environment} from "../../../environments/environment";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }
  save(quiz:any,id:number):Observable<Question>{
    return this.http.post<Question>(API_URL+"/admin/quiz/"+id,quiz)
  }
}
