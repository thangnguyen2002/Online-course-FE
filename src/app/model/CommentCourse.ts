export class CommentCourse {
  idCourse!: number;
  contentCmt!: string;


  constructor(idCourse: number, contentCmt: string) {
    this.idCourse = idCourse;
    this.contentCmt = contentCmt;
  }
}
