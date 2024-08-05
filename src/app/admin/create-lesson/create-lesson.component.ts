import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ScriptService } from '../../script.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AdminLessonService } from '../service/admin-lesson.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {
  idCourse: any;
  isLoading = false;  // Thêm biến isLoading

  constructor(private script: ScriptService, private route: ActivatedRoute, private storage: AngularFireStorage, private router: Router,
              private lessonService: AdminLessonService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.script.load('bootstrap',
      'glightbox', 'functions', 'awesome', 'bootstrap-icons', 'choices', 'bootstrap-icons', 'quill', 'stepper', 'aos', 'choices.min.js').then(data => {
    }).catch(error => console.log(error));
  }

  createForm = new FormGroup({
    nameLesson: new FormControl("", [Validators.required]),
    contentLesson: new FormControl("", [Validators.required]),
    linkVideo: new FormControl,
    timeLesson: new FormControl("", [Validators.required]),
    course: new FormControl(),
  });

  saveLesson(file: any) {
    if (this.createForm.valid) {
      this.isLoading = true;  // Bắt đầu hiển thị Spinner
      for (let f of file) {
        if (f != null) {
          const filePath = f.name;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, f).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(
                url => {
                  this.createForm.get('linkVideo')?.setValue(url);
                  this.createForm.get('course')?.setValue({'idCourse': this.idCourse});
                  console.log(this.createForm.value);
                  this.lessonService.save(this.idCourse, this.createForm.value).subscribe(
                    (data) => {
                      this.isLoading = false;  // Ẩn Spinner khi upload xong
                      this.messageCreate();
                      this.router.navigate(["/admin/courseDetail/" + this.idCourse]);
                    },
                    (error) => {
                      this.isLoading = false;  // Ẩn Spinner khi có lỗi
                      console.error('Error saving lesson', error);
                    }
                  );
                }
              );
            })
          ).subscribe();
        }
      }
    }
  }

  preview(file: any) {
    document.getElementById('video')?.setAttribute("src", file);
  }

  messageCreate() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your lesson has been saved',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
