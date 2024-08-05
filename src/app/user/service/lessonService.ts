import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../model/Course";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Lesson} from "../../model/Lesson";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) {
  }

  getAllById(id: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(API_URL + "/lesson/" + id)
  }
}
