export class ChangeProfileUser {
  constructor(avatarSrc: string, userName: string, fullName: string, email: string, address: string, dateOfBirth: string, phone: string, description: string) {
    this.avatarSrc = avatarSrc;
    this.userName = userName;
    this.fullName =fullName;
    this.email = email;
    this.address = address;
    this.dateOfBirth = dateOfBirth;
    this.phone = phone;
    this.description = description;

  }

  avatarSrc!:string
  userName!:string
  fullName!: string
  email!:string
  address!:string
  dateOfBirth!:string
  phone!:string
  description!:string
}
