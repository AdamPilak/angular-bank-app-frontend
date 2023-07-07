export class NewUser {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public username: string,
    public password: string,
    public email: string,
    public pesel: string,
    public birthdate: string,
    public sex: string,
    public phoneNumber: string,
    public accountNumber: string,
    public saldo: number,
    public activeCredits: number
  ) {}
}
