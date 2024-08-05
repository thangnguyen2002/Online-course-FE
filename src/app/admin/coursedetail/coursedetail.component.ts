import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../script.service";
import {AdminCourseService} from "../service/admin-course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../model/Course";
import {Rating} from "../../model/Rating";
import {AdminCommentService} from "../service/admin-comment.service";
import {Lesson} from "../../model/Lesson";
import {AdminLessonService} from "../service/admin-lesson.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {QuizService} from "../service/quiz.service";
import {Bill} from "../../model/Bill";
import {AdminBillService} from "../service/admin-bill.service";
import Swal from 'sweetalert2';
import {DatePipe} from "@angular/common";
import {UserMycourseService} from "../../user/service/user-mycourse.service";

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CoursedetailComponent implements OnInit {
  idCourse:any;
  course!:Course;
  rating:any[]=[]
  lesson:Lesson[]=[]
  totalCourseEarning:any
  enrollment:any
  editFormQuiz: any
  pipe = new DatePipe('en-US');
  constructor(private script: ScriptService, private courseService: AdminCourseService,
              private route: ActivatedRoute,private ratingService:AdminCommentService,
              private lessonService:AdminLessonService,private router: Router,
              private billService:AdminBillService,private quizService: QuizService,
              private myCourseService:UserMycourseService) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions',).then(data => {
    }).catch(error => console.log(error));
    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      this.courseService.findById(this.idCourse).subscribe((data)=>{
        this.course = data
        this.enrollment = data.enrolled
        this.editFormQuiz = new FormGroup({
          idQuiz: new FormControl(this.course.quiz.idQuiz),
          nameQuiz: new FormControl(this.course.quiz.nameQuiz,[Validators.required]),
          numberOfQuiz: new FormControl(this.course.quiz.numberOfQuiz),
          timeQuiz: new FormControl(this.course.quiz.timeQuiz,[Validators.required,Validators.min(1)])
        })
      })
      this.ratingService.getAllById(this.idCourse).subscribe((data)=>{
        this.rating=data
      })
      this.lessonService.getAllById(this.idCourse).subscribe((data)=>{
        this.lesson=data
      })
    })
    this.billService.getAllByIdCourse(this.idCourse).subscribe((data)=>{
      this.totalCourseEarning = 0
      for (let i = 0; i < data.length; i++) {
        this.totalCourseEarning += data[i].totalBill
      }
    })
  }

  counter(i: number) {
    return new Array(i);
  }
  approval(id:number){
    this.ratingService.approval(id).subscribe(()=>{
      this.messageApproval()
      this.ratingService.getAllById(this.idCourse).subscribe((data)=>{
        this.rating=data
      })
    })
  }
  disable(id:number){
    this.ratingService.disable(id).subscribe(()=>{
      this.messageDisable()
      this.ratingService.getAllById(this.idCourse).subscribe((data)=>{
        this.rating=data
      })
    })

  }
  deleteRating(id:number){
    this.ratingService.delete(id).subscribe()
  }
  deleteLesson(id:number){

    this.lessonService.delete(id).subscribe(
      ()=>{
        this.lessonService.getAllById(this.idCourse).subscribe((data)=>{
          this.lesson=data
        })
      }
    )
  }

  saveEditQuiz() {
    if (this.editFormQuiz.valid){
    this.quizService.save(this.editFormQuiz.value, this.course.quiz.idQuiz).subscribe(() => {
      this.messageSaveQuiz()
        this.courseService.findById(this.idCourse).subscribe((data) => {
          this.course = data
        })
      }
    )
    }
  }
  messageDisable (){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Rating has been disabled ',
      showConfirmButton: false,
      timer: 1500
    })
  }

  messageApproval(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Rating has been approvaled ',
      showConfirmButton: false,
      timer: 1500
    })
  }

  messageSaveQuiz(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your quiz setting has been saved ',
      showConfirmButton: false,
      timer: 1500
    })
  }
  confirmDelete(id:number){
    Swal.fire({
      title: 'Do you want to delete lesson?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteLesson(id)
        Swal.fire('Lesson has been deleted!', '', 'success')
      }
    })
  }
}
