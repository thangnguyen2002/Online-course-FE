import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {CourceService} from "../../user/service/cource.service";
import * as http from "http";
import {Stomp} from "@stomp/stompjs";
import {UserProfileService} from "../../user/service/user-profile.service";
import {ChangeProfileUser} from "../../model/ChangeProfileUser";
import {FormControl, FormGroup} from "@angular/forms";
import {Comment} from "../../model/Comment";
import {Rating} from "../../model/Rating";
import {AppUser} from "../../model/AppUser";
import {LoginService} from "../../auth/service/login.service";
import Swal from "sweetalert2";
import {Lesson} from "../../model/Lesson";
import {LessonService} from "../../user/service/lessonService";
import {UserMycourseService} from "../../user/service/user-mycourse.service";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit, OnChanges {
  private stompClient: any;
  comments: Comment[] = []
  ratings: Rating[] = []
  rate!: Rating
  idCmt: any
  idCourse: any
  course: any
  recommend: any
  noti: any
  notiRating: any
  isUser: boolean = false
  proFile!: ChangeProfileUser
  lessons: Lesson[]=[]
  checkBuyCourse:any
  checkRated : any
  checkTimeCourse: any

  constructor(private script: ScriptService, private route: ActivatedRoute,
              private courseService: CourceService, private router: Router,
              private userService: UserProfileService, private loginService: LoginService,
              private lessonService: LessonService,private myCourseService:UserMycourseService) {
  }

  numRating: number = 0
  num1star: number = 0
  num2star: number = 0
  num3star: number = 0
  num4star: number = 0
  num5star: number = 0
  star1: any
  star2: any
  star3: any
  star4: any
  star5: any
  ratingCourse: any
  numRate: number = 0
  editForm: FormGroup = new FormGroup({
    contentCmt: new FormControl(""),
    appUser: new FormGroup({
      idUser: new FormControl()
    }),
    course: new FormGroup({
      idCourse: new FormControl()
    })
  })


  ngOnInit(): void {
    this.connect()
    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      this.courseService.recommend(this.idCourse).subscribe((data) => {
        this.recommend = data
      })
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data

        this.ratingCourse = data.numRating
      })
      this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
        for (const cmt of data) {
          cmt.timeCmt = this.transform(cmt.timeCmt)
        }
        this.comments = data

      })
      this.courseService.checkBuyCourse(this.idCourse).subscribe((data)=>{
        console.log(data)
        this.checkBuyCourse = data
      })
      this.lessonService.getAllById(this.idCourse).subscribe((data)=>{
        this.lessons = data
      })
      this.myCourseService.getMyCourseLearn(this.idCourse).subscribe((data)=>{
        console.log(data.course.nameCourse)
        if (data.statusMyCourse) this.checkTimeCourse = true
        else this.checkTimeCourse = false
      })
      this.courseService.getAllRating(this.idCourse).subscribe((data) => {
        for (const cmt of data) {
          cmt.timeRating = this.transform(cmt.timeRating)
        }
        this.ratings = data
        this.numRating = data.length
        for (let i = 0; i < data.length; i++) {
          if (data[i].numStar == 1) {
            this.num1star++

          }
          if (data[i].numStar == 2) {
            this.num2star++

          }
          if (data[i].numStar == 3) {
            this.num3star++
            console.log("3")
          }
          if (data[i].numStar == 4) {
            this.num4star++

          }
          if (data[i].numStar == 5) {
            this.num5star++
          }
        }
        console.log(this.num1star, this.num2star, this.num3star, this.num4star, this.num5star, this.numRating)
        this.star1 = this.num1star / this.numRating * 100
        this.star2 = this.num2star / this.numRating * 100
        this.star3 = this.num3star / this.numRating * 100
        this.star4 = this.num4star / this.numRating * 100
        this.star5 = this.num5star / this.numRating * 100
      })
    })
    this.userService.getProfileFull().subscribe(data => {
      this.proFile = data
    })
    this.courseService.checkRated(this.idCourse).subscribe((data) =>{
      console.log(data)
      this.checkRated = data
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  buyCourse(idCourse: any) {
    if(this.loginService.getToken() == ""){
      this.confirmLogIn()
    }else
      if (this.loginService.getUserToken().roles[0].nameRole.includes("ROLE_USER")) {
        if (!this.checkTimeCourse){
          this.courseService.buyCourse(idCourse).subscribe((data) => {
            if (data != null) {
              this.checkTimeCourse = true
              this.messageBuySuccess()
              this.sendNotification('Bought the course','earning')
            } else {
              this.messageBuyFail()
            }
          })
        } else this.messageTimeCourse()

    }
  }
  messageTimeCourse(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'The course has not expired, cannot be purchased',
      showConfirmButton: true,
    })
  }

  connect() {
    // đường dẫn đến server
    const socket = new WebSocket('ws://localhost:8081/socket/websocket');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      // là chờ xèm thằng server gửi về.
      // _this.stompClient.subscribe('/notification/admin', function (hello: any) {
      // });
    });
  }

  sendNotification(titel:string,type:string) {
    this.stompClient.send(
      '/app/notification.send',
      {},
      // Dữ liệu được gửi đi
      JSON.stringify({
        'idNotification': 0,
        'title': titel,
        'timeNotification': new Date(),
        'appUser': this.proFile,
        'status': false,
        'sendTo': 'admin',
        'type':type
      })
    );
  }

  commentForm: FormGroup = new FormGroup({
    contentCmt: new FormControl(""),
    timeCmt: new FormControl(""),
  })

  saveCmt() {
      this.courseService.saveCmt(this.idCourse, this.commentForm.value).subscribe((data) => {
        this.commentForm.reset();
        this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
          for (const cmt of data) {
            cmt.timeCmt = this.transform(cmt.timeCmt)
          }
          this.comments = data;
        })
      })
    }


  delete(id: number) {
    this.courseService.deleteCmt(id).subscribe((data) => {
      this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
        for (const cmt of data) {
          cmt.timeCmt = this.transform(cmt.timeCmt)
        }
        this.comments = data
      })
    })

  }

  setCmt(comment: Comment) {
    this.idCmt = comment.idComment
    this.editForm = new FormGroup({
      contentCmt: new FormControl(comment.contentCmt),
      appUser: new FormGroup({
        idUser: new FormControl(comment.appUser.idUser)
      }),
      course: new FormGroup({
        idCourse: new FormControl(comment.course.idCourse)
      })
    })
  }


  editCmt() {
    this.courseService.editCmt(this.idCmt, this.editForm.value).subscribe((data) => {
      console.log(data)
      this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
        for (const cmt of data) {
          cmt.timeCmt = this.transform(cmt.timeCmt)
        }
        this.comments = data
      })

    })
  }

  ratingForm: FormGroup = new FormGroup({
    contentRating: new FormControl(""),
    numStar: new FormControl(),
    appUser: new FormGroup({
      idUser: new FormControl()
    }),
    course: new FormControl()
  })

  counter(s: number) {
    return new Array(s);
  }

  setNumRate(rate: number) {
    this.numRate = rate
    this.ratingForm.controls["numStar"]?.setValue(rate)
  }



  saveRating() {
    this.courseService.saveRating(this.idCourse, this.ratingForm.value).subscribe((data) => {
      if (data != null) {
        this.messageRatingSuccess()
        this.sendNotification('Rating the course','allRating')
      } else {
        this.messageRatingFail()
      }
      this.ratingForm.reset()
      this.rate = data;
      this.numRate = 0
      this.courseService.getAllRating(this.idCourse).subscribe((data) => {
        for (const cmt of data) {
          cmt.timeRating = this.transform(cmt.timeRating)
        }
        this.ratings = data
        this.numRating = data.length
        for (let i = 0; i < data.length; i++) {
          if (data[i].numStar == 1) {
            this.num1star++

          }
          if (data[i].numStar == 2) {
            this.num2star++

          }
          if (data[i].numStar == 3) {
            this.num3star++

          }
          if (data[i].numStar == 4) {
            this.num4star++

          }
          if (data[i].numStar == 5) {
            this.num5star++

          }
        }
        this.star1 = this.num1star / this.numRating * 100
        this.star2 = this.num2star / this.numRating * 100
        this.star3 = this.num3star / this.numRating * 100
        this.star4 = this.num4star / this.numRating * 100
        this.star5 = this.num5star / this.numRating * 100
      })
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data
        this.ratingCourse = data.numRating
      })
    })
  }

  messageRatingSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Rating successful!',
      showConfirmButton: false,
      timer: 1500
    })
  }

    messageRatingFail(){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Reviewed account!',
        showConfirmButton: false,
        timer: 1500
      })


    }


  checkName(name: any) {

    if (this.proFile?.email == name) {
      return true
    } else return false

  }

  confirmLogIn(){
    Swal.fire({
      title: 'You are not sign in. Are you want to login to purchase the course?',
      showCancelButton: true,
      confirmButtonText: 'Sign in',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(["/login"])
      }
    })
  }
  confirmLogInCmt(){
    Swal.fire({
      title: 'You are not sign in. Are you want to login to purchase the course?',
      showCancelButton: true,
      confirmButtonText: 'Sign in',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(["/login"])
      }
    })
  }

  messageBuySuccess(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Buy successful course',
      showConfirmButton: false,
      timer: 1500
    })
  }
  messageBuyFail(){
    Swal.fire({
      title: "Buy failed course, you don't have enough money? Are you want to recharge? " ,
      showCancelButton: true,
      confirmButtonText: 'Recharge',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(["/user/payment"])
      }
    })
  }
  checkLogIn(){
    if (this.loginService.getToken() == ""){
      return false
    } else return true
  }

  confirmBuy(idCourse:any){
    Swal.fire({
      title: 'Are you sure to buy this course?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.buyCourse(this.idCourse)
      }
    })
  }


  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals: { [key: string]: number } = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (2 days ago)
          }
      }
    }
    return value;
  }
}
