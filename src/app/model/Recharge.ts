export class Recharge{
  money!:number
  idUser!:number
  idReq!:number


  constructor(money: number, idUser: number, idReq: number) {
    this.money = money;
    this.idUser = idUser;
    this.idReq = idReq;
  }
}
