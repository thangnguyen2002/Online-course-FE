import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AdminBillService} from "../service/admin-bill.service";
import {Bill} from "../../model/Bill";
import {ReqRechargeService} from "../service/req-recharge.service";
import {Recharge} from "../../model/Recharge";
import {ScriptService} from "../../script.service";
import {AppUser} from "../../model/AppUser";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";
import {Stomp} from "@stomp/stompjs";

@Component({
  selector: 'app-admin-earning',
  templateUrl: './admin-earning.component.html',
  styleUrls: ['./admin-earning.component.css']
})
export class AdminEarningComponent implements OnInit,OnChanges {
bill:Bill[] =[]
  totalEarning:number = 0
  totalRecharge: number = 0
  totalBillInMonth:any
  reqRecharges:any
  billFail:number = 0
  p: any;
  g: any;
  profileBill: any;
  pipe = new DatePipe('en-US');
  stompClient:any
  constructor(private billService:AdminBillService,private reqRechargeService:ReqRechargeService,private script:ScriptService) { }

  ngOnInit(): void {
    this.billService.getAll().subscribe((data)=>{
      for (const b of data) {
        b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
      }
      this.bill = data
      for (const b of data) {
        if(b.status == true){
          if(b.contentBill == "Recharge"){
            this.totalRecharge += b.totalBill
          } else this.totalEarning += b.totalBill
        }
        if(b.status == false) this.billFail += b.totalBill
      }
      this.billService.getTotalBillInMonth().subscribe((data)=>{
        this.totalBillInMonth = data.totalBillInMonth - this.totalRecharge - this.billFail
    })

    })
    this.reqRechargeService.getAll().subscribe((data)=>{
      this.reqRecharges = data
      for (const b of data) {
        b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
      }
    })
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
    this.connect()
  }

  reChargeUser(money:any,idUser:any,idReq:any){
    let recharge:Recharge = new Recharge(money,idUser,idReq)
    this.messageComfig()
    this.sendNotification(' has approved your deposit',' payment',this.profileBill.appUser)
    this.reqRechargeService.reCharge(recharge).subscribe((data)=>{
      this.reqRechargeService.getAll().subscribe((data)=>{
        for (const b of data) {
          b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
        }
        this.reqRecharges = data
        this.billService.getAll().subscribe((data)=>{

          for (const b of data) {
            b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
          }
          this.bill = data
        })
      })
    })
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  setInst(bill: Bill) {
    this.profileBill = bill
  }
  messageComfig(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your instructor has been Confirm',
      showConfirmButton: false,
      timer: 1500
    })
  }

  connect() {
    // đường dẫn đến server
    const socket = new WebSocket('ws://localhost:8081/socket/websocket');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      // // là chờ xèm thằng server gửi về.
      // _this.stompClient.subscribe('/notification/admin', function (hello: any) {
      //   _this.getAll();
      // });

    });
  }
  sendNotification(titel:string,type:string,appUser:any) {
    this.stompClient.send(
      '/app/notification.send',
      {},
      // Dữ liệu được gửi đi
      JSON.stringify({
        'idNotification': 0,
        'title': titel,
        'timeNotification': new Date(),
        'appUser': appUser,
        'status': false,
        'sendTo': 'user',
        'type':type
      })
    );
  }
  deleteReq(idRed:any){
    this.reqRechargeService.delete(idRed).subscribe(()=>{
      this.messageDeleteReq()
      this.reqRechargeService.getAll().subscribe((data)=>{
        for (const b of data) {
          b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
        }
        this.reqRecharges = data
      })
      this.billService.getAll().subscribe((data)=>{

        for (const b of data) {
          b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
        }
        this.bill = data
      })
    })
  }
  confirm(idRed:any){
    Swal.fire({
      title: 'Are you sure you want to cancel the request?',
      showCancelButton: true,
      confirmButtonText: 'Sure',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.sendNotification(' has declined your deposit',' payment',this.profileBill.appUser)
        this.deleteReq(idRed)
      }
    })
  }
  messageDeleteReq(){
    Swal.fire({
      title: 'Cancel request successfully',
      icon: 'success',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
}
