import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../model/Course";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ChangeProfileUser} from "../../model/ChangeProfileUser";
import {Page} from "../../model/Page";
import {MyCourse} from "../../model/MyCourse";
import {LessonLearned} from "../../model/LessonLearned";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserMycourseService {

  constructor(private http: HttpClient) {
  }

  getAllMyCourse(): Observable<MyCourse[]> {
    return this.http.get<MyCourse[]>(API_URL + '/course/myCourse');
  }

  getMyCourseLearn(idCourse: any): Observable<MyCourse> {
    return this.http.get<MyCourse>(API_URL + '/course/myCourseLearn/' + idCourse);
  }

  lessonLearned(lessonLearned: any): Observable<LessonLearned> {
    return this.http.post<LessonLearned>(API_URL + '/course/learned', lessonLearned);
  }

  checkExpire(): Observable<any> {
    return this.http.get<any>(API_URL + '/course/checkExpire');
  }

  findExpired(): Observable<any> {
    return this.http.get<any>(API_URL + '/course/findExpired');
  }

  findExpire(): Observable<any> {
    return this.http.get<any>(API_URL + '/course/findExpire');
  }

}
