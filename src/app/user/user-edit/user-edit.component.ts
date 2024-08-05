import {Component, OnInit} from '@angular/core';
import {UserProfileService} from "../service/user-profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";
import {LoginService} from "../../auth/service/login.service";
import {ChangeProfileUser} from "../../model/ChangeProfileUser";
import {ChangeAvatar} from "../../model/ChangeAvatar";


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  isLoading = false;  // Thêm biến isLoading
  notiPass: any
  notiProfile: any
  changeProfileUser: any
  editAvatarForm: any
  private downloadURL: Observable<any> | undefined;
  fb: string = "";
  // user: ChangeAvatar = new ChangeAvatar("")
  user: ChangeProfileUser = new ChangeProfileUser("","","","","",'',"","")



  constructor(private profileService: UserProfileService, private router: Router, private storage: AngularFireStorage, private loginService: LoginService) {
  }

  editProfileForm = new FormGroup({
    userName: new FormControl("alo"),
    fullName: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    dateOfBirth: new FormControl(),
    phone: new FormControl(),
    description: new FormControl()

  })

  ngOnInit(): void {
    this.profileService.getProfileFull().subscribe(data => {
      this.changeProfileUser = data
      console.log(data.avatarSrc)
      this.editProfileForm = new FormGroup({
        userName: new FormControl(data.userName, [Validators.required]),
        fullName: new FormControl(data.fullName, Validators.required),
        email: new FormControl(data.email, [Validators.required]),
        address: new FormControl(data.address, [Validators.required]),
        dateOfBirth: new FormControl(data.dateOfBirth, [Validators.required]),
        phone: new FormControl(data.phone, [Validators.required]),
        description: new FormControl(data.description)
      })
      this.editAvatarForm = new FormGroup(
        {
          avatarSrcc: new FormControl(data.avatarSrc, [Validators.required])
        }
      )
    })
  }

  editProfile() {
    this.profileService.saveProfile(this.editProfileForm.value).subscribe(data => {
      if (data != null) {
        this.messageEditProSuccess()
      } else {
        this.messageEditProFail()
      }
    })
    this.router.navigate(["user/edit"])
  }

  editPassForm = new FormGroup(
    {
      oldPassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmNewPassword: new FormControl("", [Validators.required])
    }
  )

  editPassword() {
    this.profileService.savePassword(this.editPassForm.value).subscribe(data => {
      if (data != null) {
        this.messagePassSuccess()
      } else {
        this.messagePassFail()
      }
    })

  }

  editAvatar(event: Event) {
    this.isLoading = true;  // Thêm biến isLoading

    var n = Date.now();
    // @ts-ignore
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.isLoading = false;  // Thêm biến isLoading
              this.fb = url;
              document.getElementById("avatar")?.setAttribute("src",url)
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log("hmmmm")
          console.log(url);
        }
      });
  }

  editAvatarProfile() {
    let edit = {
      avatar: this.fb
    }
    console.log(edit)
    this.profileService.saveAvatar(edit).subscribe((data) => {
      this.messageEditAvatar()
      this.showUser()

    })
  }

  messageEditProSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Edit profile successful!',
      showConfirmButton: false,
      timer: 1500
    })
  }
  messageEditAvatar() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Edit Avatar successful!',
      showConfirmButton: false,
      timer: 2500
    })
    window.location.reload()
  }

  messageEditProFail() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Change profile fail ',
      showConfirmButton: false,
      timer: 1500
    })
  }

  messagePassSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Change password succes !',
      showConfirmButton: false,
      timer: 1500
    })
  }

  messagePassFail() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Change password fail ! ',
      showConfirmButton: false,
      timer: 1500
    })

  }
  showUser() {
    let id = this.loginService.getUserToken().idUser
    this.profileService.getProfileFull().subscribe((data) => {
      console.log(data)
      this.user = data;
    })
  }
}
