import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Lesson} from "../../model/Lesson";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AdminLessonService {

  constructor(private http:HttpClient) { }
  getAllById(id:number):Observable<Lesson[]>{
    return this.http.get<Lesson[]>(API_URL+"/admin/lesson/"+id)
  }
  save(id:number,lesson:any):Observable<Lesson>{
    return this.http.post<Lesson>(API_URL+"/admin/lesson/"+id,lesson)
  }
  delete(id:number):Observable<Lesson>{
    return this.http.get<Lesson>(API_URL+"/admin/lesson/delete/"+id)
  }
  findById(id:number):Observable<Lesson>{
    return this.http.get<Lesson>(API_URL+"/admin/lesson/find/"+id)
  }
}
