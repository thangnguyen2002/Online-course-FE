import {Role} from "./Role";

export class UserToken {
  idUser!: number
  userName!: string
  token!: string
  roles!: Role[]
}
