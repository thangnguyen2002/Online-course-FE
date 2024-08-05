import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../model/Course";
import {AdminCourseService} from "../service/admin-course.service";
import {Question} from "../../model/Question";
import {QuestionService} from "../service/question.service";
import {QuizService} from "../service/quiz.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ScoreQuizService} from "../service/score-quiz.service";
import {ScoreQuiz} from "../../model/ScoreQuiz";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-admin-quizdetail',
  templateUrl: './admin-quizdetail.component.html',
  styleUrls: ['./admin-quizdetail.component.css']
})
export class AdminQuizdetailComponent implements OnInit {
  idCourse: any
  idQuiz: any
  course!: Course;
  question: Question[] = []
  ques!: Question
  editForm: any
  deleQues!: Question
  scoreQuiz: ScoreQuiz[] = []
  pipe = new DatePipe('en-US');

  constructor(private script: ScriptService, private router: Router, private route: ActivatedRoute, private courseService: AdminCourseService,
              private questionService: QuestionService, private quizService: QuizService, private scoreQuizService: ScoreQuizService) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions').then(data => {
    }).catch(error => console.log(error));
    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data
        this.idQuiz = this.course.quiz.idQuiz
        this.questionService.getAllById(this.course.quiz.idQuiz).subscribe(data => {
          this.question = data
          this.ques = new Question(0, "", "", "", "", "", "")
          this.setQues(this.ques)
          this.deleQues = this.ques
        })
        this.scoreQuizService.getAllById(this.idQuiz).subscribe(data => {
          for (const b of data) {
            b.date = this.pipe.transform(b.date,'yyyy-MM-dd')
          }
          this.scoreQuiz = data
        })
      })

    })
  }

  createForm = new FormGroup({
    contentQuestion: new FormControl("", [Validators.required]),
    a: new FormControl("", [Validators.required]),
    b: new FormControl("", [Validators.required]),
    c: new FormControl("", [Validators.required]),
    d: new FormControl("", [Validators.required]),
    answer: new FormControl("", [Validators.required])

  })

  createQuestion() {
    if (this.createForm.valid) {
      this.questionService.save(this.createForm.value, this.idQuiz).subscribe(() => {
          this.createForm.reset()
        this.messageSaveQuiz()
          this.questionService.getAllById(this.idQuiz).subscribe(data => {
            this.question = data
          })
        }
      )
    }
  }

  setQues(ques: any) {
    this.editForm = new FormGroup({
        idQuestion: new FormControl(ques.idQuestion),
        contentQuestion: new FormControl(ques.contentQuestion, [Validators.required]),
        a: new FormControl(ques.a, [Validators.required]),
        b: new FormControl(ques.b, [Validators.required]),
        c: new FormControl(ques.c, [Validators.required]),
        d: new FormControl(ques.d, [Validators.required]),
        answer: new FormControl(ques.answer, [Validators.required])

      }
    )
  }

  editQuestion() {
    if (this.editForm.valid) {
      this.questionService.save(this.editForm.value, this.idQuiz).subscribe(() => {
        this.messageEditQuiz()
          this.questionService.getAllById(this.idQuiz).subscribe(data => {
            this.question = data
          })
        }
      )
    }
  }

  setDeleQues(ques: any) {
    this.deleQues = ques
  }

  deleteQuestion() {
    this.questionService.delete(this.deleQues.idQuestion).subscribe(() => {
        this.questionService.getAllById(this.idQuiz).subscribe(data => {
          this.question = data
        })
      }
    )
  }
  confirmDelete(){
    Swal.fire({
      title: 'Do you want to delete quiz?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteQuestion();
        Swal.fire('Rating has been deleted!', '', 'success')
      }
    })
  }
  messageSaveQuiz(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your question has been saved ',
      showConfirmButton: false,
      timer: 1500
    })
  }
  messageEditQuiz(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your question has been updated ',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
