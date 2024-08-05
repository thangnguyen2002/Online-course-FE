import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../script.service";
import {Course} from "../../model/Course";
import {AdminCourseService} from "../service/admin-course.service";
import {Page} from "../../model/Page";
import {getAll} from "@angular/fire/remote-config";
import {Rating} from "../../model/Rating";
import Swal from "sweetalert2";

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent implements OnInit {

  constructor(private script: ScriptService, private courseService: AdminCourseService) {
  }

  page!: Page
  course: Rating[] = []

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions').then(data => {
    }).catch(error => console.log(error));
    this.courseService.getAllByName(0,"").subscribe((data) => {
      this.page = data
      this.course = this.page.content
    })
  }

  getAll(page: number,s:string) {
    if (this.page.totalPages==0){
      this.courseService.getAllByName(0,"").subscribe((data) => {
        this.page = data
        this.course = this.page.content
      })
    }
    if (page >= 0 && page < this.page.totalPages) {
      this.courseService.getAllByName(page,s).subscribe((data) => {
        this.page = data
        this.course = this.page.content
      })
    }
  }

  counter(i: number) {
    return new Array(i);
  }
  disable(id: string){
    this.courseService.disable(id).subscribe(()=>{
      this.messageDisable()
     this.getAll(this.page.number,"")
    })

  }

  activated(id: string){
    this.courseService.activated(id).subscribe(()=>{
      this.messageActivated()
      this.getAll(this.page.number,"")
    })

  }
  messageDisable (){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your course has been disabled',
      showConfirmButton: false,
      timer: 1500
    })
  }
  messageActivated (){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your course has been activated ',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
