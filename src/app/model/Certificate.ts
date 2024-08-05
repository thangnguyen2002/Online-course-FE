import {AppUser} from "./AppUser";
import {Course} from "./Course";

export class Certificate {
  idCertificate!: number

  course!:Course

  imageCertificate!: string

  AppUser!: AppUser

  createAt!:string | null
}
