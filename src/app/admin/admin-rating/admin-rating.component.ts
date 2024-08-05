import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../script.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminCommentService} from "../service/admin-comment.service";
import {Rating} from "../../model/Rating";
import {Page} from "../../model/Page";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-rating',
  templateUrl: './admin-rating.component.html',
  styleUrls: ['./admin-rating.component.css']
})
export class AdminRatingComponent implements OnInit {
  page!: Page
  ratings: any[] = []
  rate: Rating=new Rating()

  constructor(private script: ScriptService, private router: Router, private ratingService: AdminCommentService) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions',).then(data => {
    }).catch(error => console.log(error));
    this.ratingService.getAllByNameCourse(0,"").subscribe((data) => {
      this.page = data
      this.ratings = this.page.content
      // @ts-ignore
      this.showRate(this.ratings[0])
    })
  }

  getAll(page: any,s:string) {
    if (this.page.totalPages==0){
      this.ratingService.getAllByNameCourse(0,'').subscribe((data) => {
        this.page = data
        this.ratings = this.page.content
        // @ts-ignore
        this.showRate(this.ratings[0])
      })
    }
    if (page >= 0 && page < this.page.totalPages) {
      this.ratingService.getAllByNameCourse(page,s).subscribe((data) => {
        this.page = data
        this.ratings = this.page.content
        // @ts-ignore
        this.showRate(this.ratings[0])
      })
    }
  }

  counter(s: number) {
    return new Array(s);
  }
  showRate(rate:Rating){
    this.rate=rate
  }
  disable(id:number,page:any,s:string){
    this.ratingService.disable(id).subscribe(()=>{
      this.messageDisable()
      this.getAll(page,s)
    })

  }
  approval(id:number,page:any,s:string){
    this.messageApproval()
    this.ratingService.approval(id).subscribe(()=>{
      this.getAll(page,s)
    })

  }
  delete(id:number,page:any,s:string){
    this.ratingService.delete(id).subscribe(()=>{
      this.getAll(page,s)
    })

  }

  messageApproval(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your student has been approvaled ',
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
  confirmDelete(id:number,page:any,s:string){
    Swal.fire({
      title: 'Do you want to delete rating?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.delete(id,page,s)
        Swal.fire('Rating has been deleted!', '', 'success')
      }
    })
  }
}
