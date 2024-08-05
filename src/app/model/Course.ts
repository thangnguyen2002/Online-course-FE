import {Instructor} from "./Instructor";
import {Quiz} from "./Quiz";
import {Certificate} from "./Certificate";

export class Course{
  idCourse!:number
  nameCourse!:string
  priceCourse!:number
  imgCourse!:string
  enrolled!:number
  shortDescription!:string
  descriptionCourse!:string
  timeCourse!:number
  instructor!:Instructor
  quantity!:number
  statusCourse!:boolean
  numRating!:number
  quiz!:Quiz
  numLesson!:number



  constructor(idCourse: number, nameCourse: string, priceCourse: number, imgCourse: string, enrolled: number, descriptionCourse: string, timeCourse: number, instructor: Instructor, quantity: number, statusCourse: boolean, numRating: number, quiz: Quiz) {
    this.idCourse = idCourse;
    this.nameCourse = nameCourse;
    this.priceCourse = priceCourse;
    this.imgCourse = imgCourse;
    this.enrolled = enrolled;
    this.descriptionCourse = descriptionCourse;
    this.timeCourse = timeCourse;
    this.instructor = instructor;
    this.quantity = quantity;
    this.statusCourse = statusCourse;
    this.numRating = numRating;
    this.quiz = quiz;
  }
}
