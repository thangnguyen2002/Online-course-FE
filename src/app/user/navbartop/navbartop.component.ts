import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../model/AppUser";
import {UserProfileService} from "../service/user-profile.service";

@Component({
  selector: 'app-navbartop',
  templateUrl: './navbartop.component.html',
  styleUrls: ['./navbartop.component.css']
})
export class NavbartopComponent implements OnInit {
  appUser: any
  constructor(private userService: UserProfileService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((data) => {
      this.appUser = data
      }
    )
  }


}
