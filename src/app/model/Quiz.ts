export class Quiz{
  idQuiz!:number
  nameQuiz!:string
  numberOfQuiz!:number
  timeQuiz!:number

  constructor(idQuiz: number, nameQuiz: string, numberOfQuiz: number, timeQuiz: number) {
    this.idQuiz = idQuiz;
    this.nameQuiz = nameQuiz;
    this.numberOfQuiz = numberOfQuiz;
    this.timeQuiz = timeQuiz;
  }
}
