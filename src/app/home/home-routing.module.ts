import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowhomeComponent} from "./showhome/showhome.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";
import {FindCourseComponent} from "./find-course/find-course.component";

const routes: Routes = [
  {
  path: '',
  component: ShowhomeComponent,
},
  {
    path:"course-detail-home/:idCourse",
    component: CourseDetailComponent
  },
  {path:"find-course",
  component: FindCourseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
