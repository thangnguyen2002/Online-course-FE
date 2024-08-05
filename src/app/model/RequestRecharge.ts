import {AppUser} from "./AppUser";
import {ChangeProfileUser} from "./ChangeProfileUser";

export class RequestRecharge {
  idRequest!: number
  money!: number
  appUser!: ChangeProfileUser
  createAt!: string | null
  paymentMethod!: string
  status!: boolean
}
