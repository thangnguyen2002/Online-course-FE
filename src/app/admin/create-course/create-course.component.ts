import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ScriptService} from "../../script.service";
import {AdminCourseService} from "../service/admin-course.service";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {finalize} from "rxjs";
import {Instructor} from "../../model/Instructor";
import {AdminInstructorService} from "../service/admin-instructor.service";
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit, OnChanges {
  instructor: Instructor[] = []
  isLoading = false;  // Thêm biến isLoading


  constructor(private script: ScriptService, private courseService: AdminCourseService, private storage: AngularFireStorage, private instructorService: AdminInstructorService, private router: Router) {
  }

  ngOnInit(): void {
    this.instructorService.getAll().subscribe((data) => {
        this.instructor = data
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.script.load('bootstrap',
      'glightbox', 'functions', 'awesome', 'bootstrap-icons', 'choices', 'bootstrap-icons', 'quill', 'stepper', 'aos', 'choices.min.js').then(data => {
    }).catch(error => console.log(error));
  }

  createForm = new FormGroup({
    nameCourse: new FormControl("",[Validators.required]),
    shortDescription: new FormControl("",[Validators.required]),
    imgCourse: new FormControl(),
    priceCourse: new FormControl("",[Validators.required,Validators.min(1)]),
    timeCourse: new FormControl("",[Validators.required,Validators.min(1)]),
    instructor: new FormControl(),
    descriptionCourse: new FormControl("",[Validators.required])
  })

  saveCourse(file: any) {
    if (this.createForm.valid){
      this.isLoading = true;  // Bắt đầu hiển thị Spinner
      for (let f of file) {
        if (f != null) {
            const filePath = f.name;
            const fileRef = this.storage.ref(filePath);
            this.storage.upload(filePath, f).snapshotChanges().pipe(
              finalize(() => (fileRef.getDownloadURL().subscribe(
                url => {
                  this.createForm.get('imgCourse')?.setValue(url)
                  this.createForm.get('instructor')?.setValue({'idInstructor': this.createForm.get('instructor')?.value})

                  this.courseService.save(this.createForm.value).subscribe((data) => {
                    this.isLoading = false;  // Ẩn Spinner khi upload xong
                    this.messageCreate()
                    this.router.navigate(["/admin/courseCategory"])
                  })
                })))
            ).subscribe((data) => {

            });

        }
      }
    }

  }
  messageCreate (){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your course has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
