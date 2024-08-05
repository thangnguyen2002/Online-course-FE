import { Component, OnInit } from '@angular/core';
import {CourceService} from "../service/cource.service";
import {LessonService} from "../service/lessonService";
import {ActivatedRoute} from "@angular/router";
import {Lesson} from "../../model/Lesson";
import {UserMycourseService} from "../service/user-mycourse.service";
import {QuizService} from "../../admin/service/quiz.service";
import {ScoreQuizService} from "../../admin/service/score-quiz.service";
import {ScoreQuiz} from "../../model/ScoreQuiz";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-learn-detail',
  templateUrl: './learn-detail.component.html',
  styleUrls: ['./learn-detail.component.css']
})
export class LearnDetailComponent implements OnInit {
  idCourse:any
  course:any
  lessons: Lesson[] = []
  myCourse:any
  idMyCourse:any
  completionProgress:any
  idQuiz:any
  scoreQuiz: ScoreQuiz[] = []
  pipe = new DatePipe('en-US');
  constructor(private courseService:CourceService,private lessonService:LessonService,
              private route: ActivatedRoute, private myCourseService:UserMycourseService,
              private scoreQuizService: ScoreQuizService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data)=>{
      this.idCourse = data.get("idCourse")
      this.courseService.findById(this.idCourse).subscribe((data)=>{
        this.course = data
        this.idQuiz = data.quiz.idQuiz
        this.scoreQuizService.getAllUser(this.idQuiz).subscribe((data)=>{
          for (const b of data) {
            b.date = this.pipe.transform(b.date,'yyyy-MM-dd')
          }
          this.scoreQuiz = data
        })

      })
      this.lessonService.getAllById(this.idCourse).subscribe((data)=>{
        this.lessons = data
      })
      this.myCourseService.getMyCourseLearn(this.idCourse).subscribe((data) => {
        console.log("data")
        console.log("data")
        console.log(data)
        this.myCourse = data
        this.idMyCourse = data.idMyCourse
        this.completionProgress = data.lessonList.length
      },(e)=>{
        alert("lỗi")
      })
    })
  }
  checkLessonLearn(nameLesson: any): boolean {
    for (let i = 0; i < this.myCourse.lessonList.length; i++) {
      if (this.myCourse.lessonList[i].nameLesson == nameLesson) {
        return true
        break
      }
    }
    return false
  }
  checkScoreQuiz(){
    for (const sc of this.scoreQuiz) {
      if(sc.score > 8) return true
    }
    return false
  }

}
