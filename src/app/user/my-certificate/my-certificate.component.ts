import { Component, OnInit } from '@angular/core';
import {CertificateService} from "../service/certificate.service";
import {Certificate} from "../../model/Certificate";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-my-certificate',
  templateUrl: './my-certificate.component.html',
  styleUrls: ['./my-certificate.component.css']
})
export class MyCertificateComponent implements OnInit {
  certificates: Certificate[]=[]
  pipe = new DatePipe('en-US');
  constructor(private certificateService:CertificateService) { }

  ngOnInit(): void {
    this.certificateService.findByIdUser().subscribe((data)=>{
      for (const b of data) {
        b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
      }
      this.certificates = data
    })
  }

}
