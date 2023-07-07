import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Log } from 'src/app/models/log.model';
import { User } from 'src/app/models/user.model';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.css']
})
export class CurrencyConversionComponent implements OnInit {
  @ViewChild('startCurrency') startCurrency?: any;
  @ViewChild('endCurrency') endCurrency?: any;
  @ViewChild('startValue') startValue?: any;
  @ViewChild('endValue') endValue?: any;
  @ViewChild('converterValue') converterValue?: any;

  user!: User;
  currencies: any = [
    {name: 'EUR'},
    {name: 'GBP'},
    {name: 'USD'},
    {name: 'PLN'},
    {name: 'CHF'},
    {name: 'AUD'},
    {name: 'JPY'},
    {name: 'CZK'},
    {name: 'SEK'},
    {name: 'TRY'},
    {name: 'RUB'},
  ];

  constructor(private databaseService: DatabaseService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserByUsername(this.userService.username).subscribe(user => {
      this.user = user
    });
  }

  decline(): void {
    this.router.navigate(['home']);
  }

  changeValue(startValue: string): void {
    this.startValue.nativeElement.value = startValue;
  }

  convert(): void {
    let startCurr = this.startCurrency.nativeElement.value;
    let endCurr = this.endCurrency.nativeElement.value;
    this.databaseService.test(startCurr, endCurr).subscribe((response: any) => {
      this.endValue.nativeElement.value = (this.startValue.nativeElement.value * response.result[endCurr]).toFixed(2);
      this.converterValue.nativeElement.value = response.result[endCurr];
      this.databaseService.saveLog(
        new Log(`Dokonano przewalutowania ${Number(this.startValue.nativeElement.value).toFixed(2)}${startCurr} na ${Number(this.endValue.nativeElement.value).toFixed(2)}${endCurr}.`,
        2,
        this.user.id)
      ).subscribe();
    });
  }
}
