import {Course} from "./Course";
import {AppUser} from "./AppUser";
import {Certificate} from "./Certificate";
import {Lesson} from "./Lesson";

export class MyCourse {
  idMyCourse!: number
  course!: Course
  appUser!: AppUser
  exprie!: Date
  statusMyCourse!: boolean
  certificate!: Certificate
  lessonList!: Lesson[]
  completionProgress!:number
}
