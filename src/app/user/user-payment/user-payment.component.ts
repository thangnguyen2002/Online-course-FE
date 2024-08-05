import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {ReqRechargeService} from "../../admin/service/req-recharge.service";
import Swal from "sweetalert2";
import {AdminBillService} from "../../admin/service/admin-bill.service";
import {LoginService} from "../../auth/service/login.service";
import {Bill} from "../../model/Bill";
import { DatePipe } from '@angular/common';
import {Stomp} from "@stomp/stompjs";
import {ChangeProfileUser} from "../../model/ChangeProfileUser";
import {UserProfileService} from "../service/user-profile.service";
import {RequestRecharge} from "../../model/RequestRecharge";
import {Router} from "@angular/router";
@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {
  bills:Bill[] =[]
  pipe = new DatePipe('en-US');
  private stompClient:any
  proFile!: ChangeProfileUser
  reqRecharges: RequestRecharge[] =[]
  g: any;
  constructor(private reqChargeService:ReqRechargeService, private userService: UserProfileService,private billService:AdminBillService,private loginService:LoginService,private router:Router,) { }

  ngOnInit(): void {
    this.billService.getAllByIdUser().subscribe((data)=>{
      this.bills = data
      for (const b of data) {
        b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
      }
      console.log(data)
    })
    this.userService.getProfileFull().subscribe(data => {
      this.proFile = data
    })
    this.connect()
    this.reqChargeService.getAllbyUser().subscribe((data)=>{
      for (const b of data) {
        b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
      }
      this.reqRecharges = data
    })
  }
  rechargeForm = new FormGroup({
    money: new FormControl("",[Validators.min(20),Validators.required])
  })

  rechargeVNPAYForm = new FormGroup({
    money: new FormControl("",[Validators.min(20),Validators.required])
  })
  p: any
  reqRecharge(){
        this.reqChargeService.reqRecharge(this.rechargeForm.value).subscribe(()=>{
          this.sendNotification('Request Recharge','earning')
          this.rechargeForm.reset()
          this.message()
          this.reqChargeService.getAllbyUser().subscribe((data)=>{
            for (const b of data) {
              b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
            }
            this.reqRecharges = data
          })
        })
  }

  reqRechargeVnPay(){
    this.reqChargeService.reqRechargeVNPAY(this.rechargeVNPAYForm.value).subscribe(resp=>{
      this.sendNotification('Request Recharge','earning')
      this.rechargeVNPAYForm.reset()
      this.message()
      window.open(resp.url);
      this.router.navigate(["/user"]);
    })
  }

  message(){
    Swal.fire({
      title: 'Deposit request sent successfully! Please transfer money to our bank account',
      icon: 'success',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
  connect() {
    // đường dẫn đến server
    const socket = new WebSocket('ws://localhost:8081/socket/websocket');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      // là chờ xèm thằng server gửi về.
      // _this.stompClient.subscribe('/notification/admin', function (hello: any) {
      // });
    });
  }

  sendNotification(titel:string,type:string) {
    this.stompClient.send(
      '/app/notification.send',
      {},
      // Dữ liệu được gửi đi
      JSON.stringify({
        'idNotification': 0,
        'title': titel,
        'timeNotification': new Date(),
        'appUser': this.proFile,
        'status': false,
        'sendTo': 'admin',
        'type':type
      })
    );
  }
  deleteReq(idRed:any){
    this.reqChargeService.deleteUser(idRed).subscribe(()=>{
      this.messageDeleteReq()
      this.reqChargeService.getAllbyUser().subscribe((data)=>{
        for (const b of data) {
          b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
        }
        this.reqRecharges = data
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
