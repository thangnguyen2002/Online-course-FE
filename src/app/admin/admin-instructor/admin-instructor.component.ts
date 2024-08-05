import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../script.service";
import {AdminInstructorService} from "../service/admin-instructor.service";
import {Instructor} from "../../model/Instructor";
import {Page} from "../../model/Page";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {AppUser} from "../../model/AppUser";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-instructor',
  templateUrl: './admin-instructor.component.html',
  styleUrls: ['./admin-instructor.component.css']
})
export class AdminInstructorComponent implements OnInit {
  page!: Page
  instructor: Instructor[] = []
  editForm: any

  constructor(private script: ScriptService, private instructorService: AdminInstructorService, private storage: AngularFireStorage, private router: Router) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions').then(data => {
    }).catch(error => console.log(error));
    this.instructorService.getAllPageByName(0,"").subscribe((data) => {
      this.page = data
      this.instructor = this.page.content
      this.setInst(new Instructor(1,"","",new Date(),"","",1, ""))
    })
  }

  getAll(page: number,search:string) {
    if (this.page.totalPages==0){
      this.instructorService.getAllPageByName(0,"").subscribe((data) => {
        if (data!=null){
          this.page = data
          this.instructor = this.page.content
        }

      })
    }
    if (page >= 0 && page < this.page.totalPages) {
      this.instructorService.getAllPageByName(page,search).subscribe((data) => {
        if (data!=null){
          this.page = data
          this.instructor = this.page.content
        }

      })
    }
  }

  createForm = new FormGroup({
    nameInstructor: new FormControl("", [Validators.required]),
    emailInstructor: new FormControl("", [Validators.email]),
    dateOfBirthInstructor: new FormControl("", [Validators.required]),
    phoneInstructor: new FormControl("", [Validators.required]),
    avatarInstructor: new FormControl("123"),
    experience: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required])

  })

  setInst(instructor: Instructor) {
    this.editForm = new FormGroup({
      idInstructor: new FormControl(instructor.idInstructor,[Validators.required]),
      nameInstructor: new FormControl(instructor.nameInstructor,[Validators.required]),
      emailInstructor: new FormControl(instructor.emailInstructor,[Validators.email]),
      dateOfBirthInstructor: new FormControl(instructor.dateOfBirthInstructor,[Validators.required]),
      phoneInstructor: new FormControl(instructor.phoneInstructor,[Validators.required]),
      avatarInstructor: new FormControl(instructor.avatarInstructor),
      experience: new FormControl(instructor.experience,[Validators.required]),
      description: new FormControl(instructor.instructorDescribe, [Validators.required])

    })
  }

  editInstructor(file: any,s:string) {
    if (this.editForm.valid) {
      if (file[0] == undefined) {
        this.instructorService.save(this.editForm.value).subscribe((data) => {
          this.messageEdit()
         this.getAll(this.page.number,s)
        })
      }
      for (let f of file) {
        if (f != null) {
          const filePath = f.name;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, f).snapshotChanges().pipe(
            finalize(() => (fileRef.getDownloadURL().subscribe(
              url => {
                this.editForm.get('avatarInstructor')?.setValue(url)
                this.instructorService.save(this.editForm.value).subscribe((data) => {
                  this.messageEdit()
                  this.getAll(this.page.number,s)
                })
              })))
          ).subscribe((data) => {

          });
        }
      }
    }


  }

  createInstructor(fileCreate: any,s:string) {
    if (this.createForm.valid) {
      for (let file of fileCreate) {
        console.log(file)
        if (file != null) {
          const filePathCreate = file.name;
          const fileRefCreate = this.storage.ref(filePathCreate);
          this.storage.upload(filePathCreate, file).snapshotChanges().pipe(
            finalize(() => (fileRefCreate.getDownloadURL().subscribe(
              urlCreate => {
                this.createForm.get('avatarInstructor')?.setValue(urlCreate)
                console.log(this.createForm.value)
                this.instructorService.save(this.createForm.value).subscribe((data) => {
                  this.messageCreate();
                  this.getAll(this.page.number,s)
                })
              })))
          ).subscribe((data) => {

          });
        }
      }
    }

  }
  messageCreate (){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your instructor has been saved',
        showConfirmButton: false,
        timer: 1500
    })
  }
  messageEdit(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your instructor has been updated',
      showConfirmButton: false,
      timer: 1500
    })
  }

  delete(id: number) {
    this.instructorService.delete(id).subscribe(data => {
      window.location.reload();
    })
  }

  search(input: any) {
    this.instructorService.getAllUser().subscribe((data) => {
      let usersSearch: Instructor[] = []
      for (const d of data) {
        if (d.nameInstructor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd').replace(/Đ/g, 'D').includes(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D'))) {
          usersSearch.push(d)
        }
      }
      this.instructor = usersSearch;
    })
  }
}
