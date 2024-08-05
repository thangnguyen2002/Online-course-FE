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
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CourceService {

  constructor(private http:HttpClient) { }
  findById(id:number):Observable<Course>{
    return this.http.get<Course>(`${API_URL}/course/find/${id}`)
  }
  getTrendingCourse ():Observable<Course[]>{
    return this.http.get<Course[]>(`${API_URL}/course/trendingCourse`)
  }
  getCourseNew ():Observable<Course>{
    return this.http.get<Course>(`${API_URL}/user/courseNew`)
  }
  buyCourse(idCourse:number):Observable<MyCourse>{
    return this.http.get<MyCourse>(`${API_URL}/course/buyCourse/${idCourse}`)
  }
  getAllCourseByCriteria(criteria:any):Observable<Course[]>{
    return this.http.post<Course[]>(`${API_URL}/user/courseCriteria`,criteria)
  }
  getAll():Observable<Course[]>{
    return this.http.get<Course[]>(`${API_URL}/user/allCourse`)
  }
  getAllInstructor():Observable<Instructor[]>{
    return this.http.get<Instructor[]>(`${API_URL}/user/allInstructor`)
  }

  saveCmt(id: number,cmtCourse:any):Observable<Comment>{
    console.log(id)
    return this.http.post<Comment>(`${API_URL}/comment/createCmt/`+ id, cmtCourse)
  }

  editCmt(idCmt:number, comment: Comment):Observable<Comment>{
    console.log(comment)
    return this.http.post<Comment>(`${API_URL}/comment/editCmt/`+idCmt, comment)
  }

  deleteCmt(id:number):Observable<Comment>{
    console.log(id)
    return this.http.get<Comment>(`${API_URL}/comment/deleteCmt/` + id)
  }

  getAllCmt(idCourse: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${API_URL}/comment/getAllCmt/`+idCourse);
  }

  getAllRating(idCourse: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${API_URL}/user/getALlRating/`+idCourse);
  }

  saveRating(idCourse: number,rating: Rating):Observable<Rating>{
    console.log(rating)
    return this.http.post<Rating>(`${API_URL}/user/createRating/`+idCourse,rating)
  }
  checkBuyCourse(idCourse:any):Observable<any>{
    return this.http.get<any>(`${API_URL}/course/checkBuy/`+idCourse)
  }

  checkRated(idCourse:any):Observable<any>{
    return this.http.get<any>(`${API_URL}/user/checkRated/`+idCourse)
  }

  recommend(idCourse:any):Observable<any>{
    return this.http.get<any>(`${API_URL}/recommend/`+idCourse)
  }







}
