import {Component, OnChanges, OnInit, Pipe, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";
import {NotificationService} from "../service/notification.service";
import {Notification} from "../../model/Notification";
import {Stomp} from "@stomp/stompjs";
import {TimeAgoPipe} from "time-ago-pipe";
import {UserProfileService} from "../../user/service/user-profile.service";
@Component({
  selector: 'app-navbartop',
  templateUrl: './navbartop.component.html',
  styleUrls: ['./navbartop.component.css']
})
export class NavbartopComponent  implements OnInit, OnChanges {
  private stompClient: any;
  statusNoti: boolean = false
  notification: Notification[] = []
  profile:any
  constructor(private script: ScriptService, private loginService: LoginService, private router: Router,
              private notificationService: NotificationService,private userService:UserProfileService) {
  }

  ngOnInit(): void {
    this.userService.getProfileFull().subscribe((data)=>{
      this.profile = data
    })
    this.getAll()
    this.connect()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  getAll() {
    this.notificationService.getAll('admin').subscribe((data) => {
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
    this.notificationService.doneNotification(notis).subscribe(() => {
      this.getAll()
      this.router.navigate(["/admin/"+noti.type])
    })
  }

  doneAll() {
    this.notificationService.doneNotification(this.notification).subscribe(() => {
      this.getAll()
    })
  }

  signOut() {
    this.loginService.setToken("");
    localStorage.setItem("userToken", "")
    this.router.navigate([""])
  }
  connect() {
    // đường dẫn đến server
    const socket = new WebSocket('ws://localhost:8081/socket/websocket');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      // là chờ xèm thằng server gửi về.
      _this.stompClient.subscribe('/notification/admin', function (hello: any) {
        _this.getAll();
      });

    });
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
