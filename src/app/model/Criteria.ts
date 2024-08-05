export class Criteria {
  nameCourse!: string;
  from!: number
  to!: number
  experience!: number
  nameInstructor!: number
  rating!: number

  constructor(nameCourse: string, from: number, to: number, experience: number, nameInstructor: number, rating: number) {
    this.nameCourse = nameCourse;
    this.from = from;
    this.to = to;
    this.experience = experience;
    this.nameInstructor = nameInstructor;
    this.rating = rating;
  }
}
