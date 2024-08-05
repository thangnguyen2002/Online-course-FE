import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Instructor} from "../../model/Instructor";
import {environment} from "../../../environments/environment";
import {Page} from "../../model/Page";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AdminInstructorService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(API_URL + '/admin/instructor');
  }
  getAllPage(page:any):Observable<Page> {
    return this.http.get<Page>(API_URL + '/admin/instructor/'+page);
  }
  getAllPageByName(page:any,search:string):Observable<Page> {
    return this.http.get<Page>(API_URL + '/admin/instructor/'+page+'/'+search);
  }
  save(instructor:any):Observable<Instructor> {
    return this.http.post<Instructor>(API_URL + '/admin/instructor/save',instructor);
  }
  delete(id:any):Observable<Instructor> {
    return this.http.get<Instructor>(API_URL + '/admin/instructor/delete/'+id);
  }
  getAllUser():Observable<Instructor[]> {
    return this.http.get<Instructor[]>(API_URL + '/user/instructor')
  }
}
