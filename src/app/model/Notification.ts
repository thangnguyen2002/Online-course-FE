import {AppUser} from "./AppUser";

export class Notification{
  idNotification!:number;
  title!:string
  timeNotification!:Date
  appUser!:AppUser
  status!:boolean
  sendTo!:string
  type!:string
  linkId!:string

  constructor(idNotification: number, title: string, timeNotification: Date, appUser: AppUser, status: boolean, sendTo: string, type: string, linkId: string) {
    this.idNotification = idNotification;
    this.title = title;
    this.timeNotification = timeNotification;
    this.appUser = appUser;
    this.status = status;
    this.sendTo = sendTo;
    this.type = type;
    this.linkId = linkId;
  }
}
