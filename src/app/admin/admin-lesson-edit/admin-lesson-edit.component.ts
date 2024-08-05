import {Component, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AdminLessonService} from "../service/admin-lesson.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {Lesson} from "../../model/Lesson";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-lesson-edit',
  templateUrl: './admin-lesson-edit.component.html',
  styleUrls: ['./admin-lesson-edit.component.css']
})
export class AdminLessonEditComponent implements OnInit {

  idLesson: any
  idCourse: any
  lesson!: Lesson
  editForm: any

  constructor(private script: ScriptService, private route: ActivatedRoute, private storage: AngularFireStorage, private router: Router,
              private lessonService: AdminLessonService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.idLesson = paramMap.get('idLesson');
    })
    this.lessonService.findById(this.idLesson).subscribe((data) => {
      this.lesson = data
      this.idCourse = data.course.idCourse
      this.editForm = new FormGroup({
        idLesson: new FormControl(data.idLesson),
        nameLesson: new FormControl(data.nameLesson, [Validators.required]),
        contentLesson: new FormControl(data.contentLesson, [Validators.required]),
        linkVideo: new FormControl(data.linkVideo),
        timeLesson: new FormControl(data.timeLesson, [Validators.required]),
        course: new FormControl(data.course)
      })
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.script.load('bootstrap',
      'glightbox', 'functions', 'awesome', 'bootstrap-icons', 'choices', 'bootstrap-icons', 'quill', 'stepper', 'aos', 'choices.min.js').then(data => {
    }).catch(error => console.log(error));
  }

  editLesson(file: any) {
    if (this.editForm.valid) {
      if (file[0] == undefined) {
        this.lessonService.save(this.idCourse, this.editForm.value).subscribe((data) => {
          this.messageEdit()
          this.router.navigate(["/admin/courseDetail/" + this.idCourse])
        })
      }
      for (let f of file) {
        if (f != null) {
          const filePath = f.name;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, f).snapshotChanges().pipe(
            finalize(() => (fileRef.getDownloadURL().subscribe(
              url => {
                this.editForm.get('linkVideo')?.setValue(url)
                this.lessonService.save(this.idCourse, this.editForm.value).subscribe((data) => {
                  this.messageEdit()
                  this.router.navigate(["/admin/courseDetail/" + this.idCourse])
                })
              })))
          ).subscribe((data) => {

          });
        }
      }
    }


  }
  messageEdit (){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your lesson has been updated',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
