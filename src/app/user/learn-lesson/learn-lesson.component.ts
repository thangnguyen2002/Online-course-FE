import {Component, Inject, OnInit} from '@angular/core';
import {AdminCourseService} from "../../admin/service/admin-course.service";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../../model/Course";
import {Lesson} from "../../model/Lesson";
import {AdminLessonService} from "../../admin/service/admin-lesson.service";
import {UserMycourseService} from "../service/user-mycourse.service";
import {CourceService} from "../service/cource.service";
import {DOCUMENT} from "@angular/common";
import {LessonLearned} from "../../model/LessonLearned";
import {LessonService} from "../service/lessonService";
import {interval} from "rxjs";


@Component({
  selector: 'app-learn-lesson',
  templateUrl: './learn-lesson.component.html',
  styleUrls: ['./learn-lesson.component.css']
})
export class LearnLessonComponent implements OnInit {
  idCourse: any;
  course!: Course;
  lesson: Lesson[] = []
  myCourse: any
  idMyCourse: any
  completionProgress: any
  totalLesson: any
  time: number = 0
  isFirstPlay: boolean = true
  isPause: boolean = false
  idLesson: any

  constructor(private route: ActivatedRoute, private courseService: CourceService, private lessonService: LessonService
    , private myCourseService: UserMycourseService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      console.log(this.idCourse)
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data

      })
      this.lessonService.getAllById(this.idCourse).subscribe((data) => {
        this.lesson = data
        this.totalLesson = data.length
        this.idLesson = data[0].idLesson
      })
      this.myCourseService.getMyCourseLearn(this.idCourse).subscribe((data) => {
        this.myCourse = data
        this.idMyCourse = data.idMyCourse
        this.completionProgress = data.lessonList.length
      })
    })
  }

  learn(link: any, idLeson: any) {
    document.getElementById('video')?.setAttribute("src", link);
    this.idLesson = idLeson
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

  lessonLearned(idLesson: any) {
    let lessonLearned: LessonLearned = new LessonLearned(this.idMyCourse, idLesson)
    this.myCourseService.lessonLearned(lessonLearned).subscribe(data => {
      this.lessonService.getAllById(this.idCourse).subscribe((data) => {
        this.totalLesson = data.length
        this.myCourseService.getMyCourseLearn(this.idCourse).subscribe((data) => {
          this.myCourse = data
          this.idMyCourse = data.idMyCourse
          this.completionProgress = data.lessonList.length
        })
      })
    })
    this.time = 0
  }

  play(videoDuration:any) {
    this.isPause = false
    if (this.isFirstPlay) {
      let inserval = setInterval(() => {
        if (!this.isPause) {
          this.time++
          if (this.time >= videoDuration - 1) {
            this.lessonLearned(this.idLesson);
            this.isFirstPlay = true
            clearInterval(inserval)
          }
        }
      }, 1000)
      this.isFirstPlay = false
    } else {
      this.isPause = false
    }
  }

  pause() {
    this.isPause = true
  }
}


