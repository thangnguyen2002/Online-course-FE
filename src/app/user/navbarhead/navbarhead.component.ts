import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../script.service";
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";
import {UserProfileService} from "../service/user-profile.service";
import {Notification} from "../../model/Notification";
import {NotificationService} from "../../admin/service/notification.service";
import {Stomp} from "@stomp/stompjs";

@Component({
  selector: 'app-navbarhead',
  templateUrl: './navbarhead.component.html',
  styleUrls: ['./navbarhead.component.css']
})
export class NavbarheadComponent implements OnInit {
  profile:any
  statusNoti:boolean=false
  notification: Notification[] = []
  wallet:any
  private stompClient: any;
  constructor(private script: ScriptService,private loginService:LoginService,
              private router:Router,private userService:UserProfileService,private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.userService.getProfileFull().subscribe((data)=>{
      this.profile = data
      this.getAll()
      this.connect()
    })
    this.userService.findWallet().subscribe((data)=>{
      this.wallet=data
    })


  }
  getAll() {
    this.notificationService.getAllUser(this.profile.userName).subscribe((data) => {
      console.log(data)
      this.notification = data
      for (const n of data) {
        n.timeNotification = this.transform(n.timeNotification)
      }
      if (this.notification.length == 0) {
        this.statusNoti = false
      } else {
        this.statusNoti = true
      }
    })
  }
  doneStatus(noti: any) {
    let notis: Notification[] = [noti]
    this.notificationService.doneNotificationUser(notis).subscribe(() => {
      this.getAll()
      this.router.navigate(["/user/"+noti.type])
      window.location.reload()
    })
  }
  doneAll() {
    this.notificationService.doneNotificationUser(this.notification).subscribe(() => {
      this.getAll()
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
      _this.stompClient.subscribe('/notification/'+_this.profile.userName, function (hello: any) {
        _this.getAll();
      });

    });
  }
  signOut(){
    this.loginService.setToken("");
    localStorage.setItem("userToken","")
    this.router.navigate([""])
  }
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals: { [key: string]: number } = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (2 days ago)
          }
      }
    }
    return value;
  }

}
