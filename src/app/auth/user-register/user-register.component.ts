import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { LoginService } from '../service/login.service';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  checkDuplicateMail:boolean = true
  checkDuplicateUsername:boolean = true
  isLoading = false;  // Thêm biến isLoading


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    userName: new FormControl("", [Validators.required, Validators.minLength(6)]),
    email: new FormControl("", Validators.required),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  // register(){
  //   this.isLoading = true;  // Thêm biến isLoading
  //   this.loginService.register(this.registerForm.value).subscribe((data)=>{
  //     this.checkDuplicateUsername=data[0];
  //     this.checkDuplicateMail=data[1];
  //     if (data[0]&&data[1]){
  //       this.message()
  //       this.router.navigate(["/login"])
  //     }
  //     this.isLoading = false;
  //   });
  // }
  async register() {
    this.isLoading = true;
    try {
      const data = await firstValueFrom(this.loginService.register(this.registerForm.value));
      this.checkDuplicateUsername = data[0];
      this.checkDuplicateMail = data[1];
      if (this.checkDuplicateUsername && this.checkDuplicateMail) {
        this.message();
        this.router.navigate(["/login"]);
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  message (){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Register account success ',
      showConfirmButton: false,
      timer: 1500
    })
  }
}



