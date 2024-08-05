import {Course} from "./Course";
import {AppUser} from "./AppUser";

export class Rating{
  idRating!:number
  contentRating!:string
  numStar!:number
  timeRating!: Date
  statusRating!:boolean
  appUser!:AppUser
  course!:Course
  imgCourse: any;
  statusCourse!: boolean;
  idCourse!: string;
  nameCourse!: any;
  instructor!: any;
  numRating!: number;
  enrolled!: any;
}
