import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../script.service";
import {AdminCourseService} from "../service/admin-course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../auth/service/login.service";

@Component({
  selector: 'app-navbarleft',
  templateUrl: './navbarleft.component.html',
  styleUrls: ['./navbarleft.component.css']
})
export class NavbarleftComponent implements OnInit {

  constructor(private script: ScriptService,private loginService:LoginService,private router:Router) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  signOut(){
    this.loginService.setToken("");
    localStorage.setItem("userToken","")
    this.router.navigate([""])
  }
}
