import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Log } from 'src/app/models/log.model';
import { User } from 'src/app/models/user.model';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css'],
})
export class CreditComponent implements OnInit {
  @ViewChild('select') select?: ElementRef;
  @ViewChild('totalValueOfCreditInput') totalValueOfCreditInput?: ElementRef;
  @ViewChild('valueOfInstallmentInput') valueOfInstallmentInput?: ElementRef;
  @ViewChild('rrso') rrso?: ElementRef;
  user!: User;
  RRSO: number = 25.73;
  creditReasons: any = [
    {name: 'Dom'},
    {name: 'Zdrowie'},
    {name: 'Życie'},
    {name: 'Inny'}
  ]
  message:string = '';

  constructor(private userService: UserService, private databaseService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserByUsername(this.userService.username).subscribe(user => {
      this.user = user
    });
  }

  decline(): void {
    this.router.navigate(['home']);
  }

  calculateAge(): number {
    const ageDifMs = Date.now() - new Date(this.user.dateOfBirth).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  checkIfUserCanGetCredit(valueOfCredit: string, numberOfInstallments: string): void {
    let value: number = Number(valueOfCredit);
    if (this.calculateAge() < 18) {
      this.message = 'Brak 18 lat.';
      return;
    }
    if (this.user.activeCredits > 0) {
      if (this.user.saldo < value * 0.3) {
        this.message = 'Saldo nie przekracza 30% kwoty kredytu.';
        return;
      }
    } else {
      if (this.user.saldo < value * 0.1) {
        this.message = 'Saldo nie przekracza 10% kwoty kredytu.';
        return;
      }
    }
    if (this.select) {
      this.databaseService.saveLog(
        new Log(`Wzięto kredyt o wartości ${Number(valueOfCredit).toFixed(2)}PLN z ilością rat wynoszącą ${Number(numberOfInstallments).toFixed(2)}. Powód ${this.select.nativeElement.value}.`,
        3,
        this.user.id)
      ).subscribe();
      this.userService.updateUserSaldo(this.user.id, value, 1).subscribe(response => {
        this.router.navigate(['home']);
      });
    }
  }

  calculateTotalCreditValue(creditValue: string): void {
    let value: number = Number(creditValue);
    if (this.totalValueOfCreditInput) {
      this.totalValueOfCreditInput.nativeElement.value = (value * ((this.RRSO/100)+1)).toFixed(2);
    }
  }

  calculateValueOfInstallment(numberOfInstallments: string, totalValueOfCreditInput: string): void {
    if (this.valueOfInstallmentInput) {
      if (numberOfInstallments) {
        this.valueOfInstallmentInput.nativeElement.value = (Number(totalValueOfCreditInput) / Number(numberOfInstallments)).toFixed(2);
      } else {
        this.valueOfInstallmentInput.nativeElement.value = Number(totalValueOfCreditInput);
      }
    }
  }
}
