import {AppUser} from "./AppUser";
import {Course} from "./Course";

export class Comment {
  idComment!: number;
  contentCmt!: string;
  timeCmt!: Date;
  appUser!: AppUser;
  course!: Course;


  constructor(idComment: number, contentCmt: string, timeCmt: Date, appUser: AppUser, course: Course) {
    this.idComment = idComment;
    this.contentCmt = contentCmt;
    this.timeCmt = timeCmt;
    this.appUser = appUser;
    this.course = course;
  }
}

