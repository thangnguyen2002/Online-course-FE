export class Question{
  idQuestion!:number
  contentQuestion!:string
  a!:string
  b!:string
  c!:string
  d!:string
  answer!:string

  constructor(idQuestion: number, contentQuestion: string, a: string, b: string, c: string, d: string, answer: string) {
    this.idQuestion = idQuestion;
    this.contentQuestion = contentQuestion;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.answer = answer;
  }
}
