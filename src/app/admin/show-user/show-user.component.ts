import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppUser} from "../../model/AppUser";
import {UserProfileService} from "../../user/service/user-profile.service";
import {ScriptService} from "../../script.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit, OnChanges {
  appUsers: AppUser[] = []
  p: any;
  form: any;
  profileUser: any
  page: any;


  constructor(private userProfileService: UserProfileService, private script: ScriptService) {
  }

  ngOnInit(): void {
    this.userProfileService.getProfiles(this.page).subscribe((data) => {
      this.appUsers = data

    })
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  setInst(appUser: AppUser) {
    this.profileUser = appUser
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
    //   console.log('script loaded ', data);
    // }).catch(error => console.log(error));
  }

  disableUser(idUser: number) {
    this.messageDisable()
    this.userProfileService.disableUser(idUser).subscribe((data) => {
      this.userProfileService.getProfiles(this.page).subscribe((data) => {
        this.page = data
        this.appUsers = this.page.content
        this.userProfileService.getProfiles(this.page).subscribe((data) => {
          this.appUsers = data
        })
      })
    })
  }


  activatedUser(idUser: number) {
    this.userProfileService.activatedUser(idUser).subscribe(() => {
      this.userProfileService.getProfiles(this.page).subscribe((data) => {
      this.messageActivated()
      this.userProfileService.getProfiles(this.page).subscribe((data) => {
        this.page = data
        this.appUsers = this.page.content
        this.userProfileService.getProfiles(this.page).subscribe((data) => {
          this.appUsers = data
        })
      })
    })
  })
  }

  onSubmit(event: Event) {
    event.preventDefault();  // Ngăn chặn form tự động submit và refresh trang
    // Bạn có thể thêm logic khác tại đây nếu cần
  }

  // search(input: any) {
  //   this.userProfileService.getProfiles(this.page).subscribe((data) => {
  //     let usersSearch: AppUser[] = []
  //     for (const d of data) {
  //       if (d.fullName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  //         .replace(/đ/g, 'd').replace(/Đ/g, 'D').includes(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  //           .replace(/đ/g, 'd').replace(/Đ/g, 'D'))) {
  //         usersSearch.push(d)
  //       }
  //     }
  //     this.appUsers = usersSearch;
  //     console.log('appUser: ', this.appUsers);
      
  //   })
  // }

  search(input: any) {
    this.userProfileService.getProfiles(this.page).subscribe((data) => {
        let usersSearch: AppUser[] = [];
        const normalizedInput = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                                    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
        
        for (const d of data) {
            if (d.fullName) { // Kiểm tra nếu fullName không phải null
                const normalizedFullName = d.fullName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
                if (normalizedFullName.includes(normalizedInput)) {
                    usersSearch.push(d);
                }
            }
        }
        this.appUsers = usersSearch;
        console.log('appUsers: ', this.appUsers);
    });
}


  messageActivated (){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your student has been activated ',
      showConfirmButton: false,
      timer: 1500
    })
  }
  messageDisable (){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your student has been disabled ',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
