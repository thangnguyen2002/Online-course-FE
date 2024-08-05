export class CertificateDTO{
  img!:string
  idCourse!:number
  createAt!:Date

  constructor(img: string, idCourse: number, createAt: Date) {
    this.img = img;
    this.idCourse = idCourse;
    this.createAt = createAt;
  }
}
