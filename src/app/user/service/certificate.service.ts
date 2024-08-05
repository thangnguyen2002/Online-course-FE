import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../model/Course";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {MyCourse} from "../../model/MyCourse";
import {Instructor} from "../../model/Instructor";
import {Comment} from "../../model/Comment";
import {CommentCourse} from "../../model/CommentCourse";
import {Rating} from "../../model/Rating";
import {Certificate} from "../../model/Certificate";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http:HttpClient) { }
  findByIdUser():Observable<Certificate[]>{
    return this.http.get<Certificate[]>(`${API_URL}/user/cerUser`)
  }
  getAll():Observable<Certificate[]>{
    return this.http.get<Certificate[]>(`${API_URL}/user/certificate`)
  }
  saveCer(certificateDTO:any):Observable<any>{
    return this.http.post<any>(`${API_URL}/user/save-certificate`,certificateDTO)
  }
  findCer(idCourse:number):Observable<any>{
    return this.http.get<any>(`${API_URL}/user/findCer/`+idCourse)
  }

}
