import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserLoginComponent} from "./auth/user-login/user-login.component";
import {UserRegisterComponent} from "./auth/user-register/user-register.component";
import {CoursedetailComponent} from "./admin/coursedetail/coursedetail.component";
import {CourseDetailComponent} from "./home/course-detail/course-detail.component";
import {AdminGuard} from "./admin/admin.guard";
import {UserGuard} from "./user/user.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'admin', canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: 'user',canActivate: [UserGuard],
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
  {path:"login",
  component: UserLoginComponent },
  {
    path:"register",
    component: UserRegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
