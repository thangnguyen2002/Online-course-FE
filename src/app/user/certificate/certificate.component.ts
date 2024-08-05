import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserMycourseService} from "../service/user-mycourse.service";
import {ScoreQuizService} from "../../admin/service/score-quiz.service";
import {CourceService} from "../service/cource.service";
import {ScoreQuiz} from "../../model/ScoreQuiz";
import {DatePipe} from "@angular/common";
import * as htmlToImage from "html-to-image";
import {saveAs} from 'file-saver';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {CertificateDTO} from "../../model/CertificateDTO";
import {CertificateService} from "../service/certificate.service";

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit, AfterViewInit {
  idCourse: any
  node: any
  course: any
  idQuiz: any
  scoreQuiz: ScoreQuiz[] = []
  hightScore: any
  date: any
  checkCertificate: any
  dateCreate: any
  pipe = new DatePipe('en-US')
  nameCertificate: any
  isLoading = false;  // Thêm biến isLoading


  constructor(private route: ActivatedRoute, private myCourseService: UserMycourseService,
              private scoreQuizService: ScoreQuizService, private courseService: CourceService,
              private storage: AngularFireStorage, private cerService: CertificateService) {
  }

  ngAfterViewInit(): void {
    this.node = document.getElementById('contentToConvert')
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      this.idCourse = data.get("idCourse")
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data
        this.idQuiz = data.quiz.idQuiz
        this.scoreQuizService.getAllUser(this.idQuiz).subscribe((data) => {
          this.scoreQuiz = data
          let max: number = data[0]?.score
          let date: string | null | undefined = data[0]?.date
          for (let i = 0; i < data.length; i++) {
            if (data[i].score > max) {
              max = data[i].score
              date = data[i].date
            }
          }
          this.nameCertificate = data[0]?.appUser.fullName
          this.hightScore = max
          this.dateCreate = date
          this.date = this.pipe.transform(date, 'yyyy-MM-dd')
          this.checkCer()
        })
      })
    })
  }

  generatePNG() {
    htmlToImage.toPng(this.node)
      .then(function (dataUrl) {
        var img = new Image();
        // img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    htmlToImage.toPng(this.node)
      .then(function (dataUrl) {
        saveAs(dataUrl, name + '.png')
        // download(dataUrl, 'my-node.png');
      });
  }

  generatePDF() {
    console.log(this.node)
    var data = document.getElementById('contentToConvert');
    html2canvas(this.node).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }

  createCertificate() {
    this.isLoading = true;  // Thêm biến isLoading
    htmlToImage.toPng(this.node)
      .then(function (dataUrl) {
        var img = new Image();
        // img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    htmlToImage.toPng(this.node)
      .then((dataUrl) => {
        dataUrl = dataUrl.split(/,(.+)/)[1]
        console.log(dataUrl)
        const fileRef = this.storage.ref("dataUrl");
        fileRef.putString(dataUrl, "base64", {contentType: 'image/png'}).snapshotChanges().pipe(
          finalize(() => (fileRef.getDownloadURL().subscribe(
            url => {
              console.log(url)
              let certificateDTO = new CertificateDTO(url, this.idCourse, this.dateCreate)
              this.cerService.saveCer(certificateDTO).subscribe((data) => {
                this.isLoading = false;
                this.checkCer()
              })
            })))
        ).subscribe()

        // download(dataUrl, 'my-node.png');
      });
  }

  checkCer() {
    this.cerService.findCer(this.idCourse).subscribe((data) => {

      if (data != null) {
        this.checkCertificate = false
      } else {
        this.checkCertificate = true
      }
    })
  }
}
