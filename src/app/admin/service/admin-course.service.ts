import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Course} from "../../model/Course";
import {Page} from "../../model/Page";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AdminCourseService {

  constructor(private http:HttpClient) { }
  getAllByName(page:number,search:string): Observable<Page> {
    return this.http.get<Page>(API_URL + '/admin/'+page+"/"+search);
  }
  getAll(page:number): Observable<Page> {
    return this.http.get<Page>(API_URL + '/admin/'+page);
  }
  search(input:string):Observable<Course[]>{
    return this.http.get<Course[]>(API_URL+"admin/search")
  }
  findById(id:number):Observable<Course>{
    return this.http.get<Course>(`${API_URL}/admin/find/${id}`)
  }
  save(course:any):Observable<Course>{
    return this.http.post<Course>(`${API_URL}/admin/saveCourse`,course)
  }
  disable(id:any):Observable<Course>{
    return this.http.get<Course>(`${API_URL}/admin/disable/${id}`)
  }
  activated(id:any):Observable<Course>{
    return this.http.get<Course>(`${API_URL}/admin/activated/${id}`)
  }
}
