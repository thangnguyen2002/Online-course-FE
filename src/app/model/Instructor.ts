import {throttleTime} from "rxjs";

export class Instructor{
  idInstructor!:number
  nameInstructor!:string
  emailInstructor!:string
  dateOfBirthInstructor!:Date
  phoneInstructor!:string
  avatarInstructor!:string
  experience!:number
  instructorDescribe!: string


  constructor(idInstructor: number, nameInstructor: string, emailInstructor: string, dateOfBirthInstructor: Date, phoneInstructor: string, avatarInstructor: string, experience: number, instructorDescribe: string) {
    this.idInstructor = idInstructor;
    this.nameInstructor = nameInstructor;
    this.emailInstructor = emailInstructor;
    this.dateOfBirthInstructor = dateOfBirthInstructor;
    this.phoneInstructor = phoneInstructor;
    this.avatarInstructor = avatarInstructor;
    this.experience = experience;
    this.instructorDescribe = instructorDescribe;
  }
}
