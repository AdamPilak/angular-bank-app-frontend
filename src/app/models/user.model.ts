export class User {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public username: string,
    public email: string,
    public pesel: string,
    public dateOfBirth: Date,
    public sex: string,
    public phoneNumber: string,
    public accountNumber: string,
    public saldo: number,
    public activeCredits: number
  ) {}
}
