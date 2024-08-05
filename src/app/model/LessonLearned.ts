export class LessonLearned{
idMyCourse!:number
  idLesson!:number

  constructor(idMyCourse: number, idLesson: number) {
    this.idMyCourse = idMyCourse;
    this.idLesson = idLesson;
  }
}
