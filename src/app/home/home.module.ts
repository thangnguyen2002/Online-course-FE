import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ShowhomeComponent } from './showhome/showhome.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { FindCourseComponent } from './find-course/find-course.component';
import { NavbartopHomeComponent } from './navbartop-home/navbartop-home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";








@NgModule({
  declarations: [
    ShowhomeComponent,
    CourseDetailComponent,
    FindCourseComponent,
    NavbartopHomeComponent,





  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class HomeModule { }
