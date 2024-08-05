import {Quiz} from "./Quiz";
import {AppUser} from "./AppUser";

export class ScoreQuiz{
  idScore!:number
  quiz!:Quiz
  appUser!:AppUser
  score!:number
  date!:string | null
}
