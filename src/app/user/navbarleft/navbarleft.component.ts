import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../script.service";
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbarleft',
  templateUrl: './navbarleft.component.html',
  styleUrls: ['./navbarleft.component.css']
})
export class NavbarleftComponent implements OnInit {

  constructor(private script: ScriptService,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  signOut(){
    this.loginService.setToken("");
    localStorage.setItem("userToken","")
    this.router.navigate([""])
  }

}
