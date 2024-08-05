import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FE_Course_Saling_Web';
  name = 'Angular';
  date  = new Date();
  hours = this.date.getHours();
  minutes = this.date.getMinutes();
  seconds: number = 0;
  constructor(){
    this.show();
  }
  show(){
    setInterval(() =>{
      this.seconds = this.date.getSeconds();
    },1000);
  }

}
