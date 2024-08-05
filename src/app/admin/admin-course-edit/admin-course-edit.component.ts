import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Instructor} from "../../model/Instructor";
import {ScriptService} from "../../script.service";
import {AdminCourseService} from "../service/admin-course.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AdminInstructorService} from "../service/admin-instructor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {Course} from "../../model/Course";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-course-edit',
  templateUrl: './admin-course-edit.component.html',
  styleUrls: ['./admin-course-edit.component.css']
})
export class AdminCourseEditComponent implements OnInit, OnChanges {
  isLoading = false;  // Thêm biến isLoading
  instructor: Instructor[] = []
  course!: Course
  idCourse: any
  editForm: any

  constructor(private script: ScriptService, private courseService: AdminCourseService, private storage: AngularFireStorage, private instructorService: AdminInstructorService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data
        this.editForm = new FormGroup({
          idCourse: new FormControl(data.idCourse),
          nameCourse: new FormControl(data.nameCourse, [Validators.required]),
          priceCourse: new FormControl(data.priceCourse, [Validators.required,Validators.min(1)]),
          imgCourse: new FormControl(data.imgCourse),
          enrolled: new FormControl(data.enrolled),
          shortDescription: new FormControl(data.shortDescription, [Validators.required]),
          descriptionCourse: new FormControl(data.descriptionCourse, [Validators.required]),
          timeCourse: new FormControl(data.timeCourse, [Validators.required,Validators.min(1)]),
          instructor: new FormControl(data.instructor.idInstructor),
          quantity: new FormControl(data.quantity),
          statusCourse: new FormControl(data.statusCourse),
          numRating: new FormControl(data.numRating),
          quiz: new FormControl(data.quiz)
        })
      })
    })
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


  saveCourse(file: any) {
    if (this.editForm.valid) {
      this.isLoading = true;  // Bắt đầu hiển thị Spinner
      if (file[0] == undefined) {
        this.editForm.get('instructor')?.setValue({'idInstructor': this.editForm.get('instructor')?.value})
        console.log(this.editForm.value)
        this.courseService.save(this.editForm.value).subscribe((data) => {
          this.messageEdit()
          this.router.navigate(["/admin/courseCategory"])
        })
      }
      for (let f of file) {
        if (f != null) {
          const filePath = f.name;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, f).snapshotChanges().pipe(
            finalize(() => (fileRef.getDownloadURL().subscribe(
              url => {
                this.editForm.get('imgCourse')?.setValue(url)
                this.editForm.get('instructor')?.setValue({'idInstructor': this.editForm.get('instructor')?.value})
                console.log(this.editForm.value)
                this.courseService.save(this.editForm.value).subscribe((data) => {
                  this.isLoading = false;  // Bắt đầu hiển thị Spinner
                  this.messageEdit()
                  this.router.navigate(["/admin/courseCategory"])
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
      title: 'Your course has been edited ',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
