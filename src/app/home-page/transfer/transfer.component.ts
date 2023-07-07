import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Log } from 'src/app/models/log.model';
import { Router } from '@angular/router';

interface Transfer {
  receiverId: number;
  accountNumber: string;
  sumOfTransfer: number;
  titleOfTransfer: string;
}

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit, AfterViewInit {
  @ViewChild('select') select?: ElementRef;
  @ViewChild('accountNumberInput') accountNumberInput?: ElementRef;
  user!: User;
  users?: User[];
  selectedUser?: User;
  afterTransferSaldo: number = 0;

  constructor(
    private userService: UserService,
    private databaseService: DatabaseService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    if (this.users && this.users?.length !== 0) {
      this.selectedUser = this.users[0];
      if (this.accountNumberInput) {
        this.accountNumberInput.nativeElement.value =
          this.users[0].accountNumber;
      }
    }
    this.select?.nativeElement.addEventListener('change', (event: any) => {
      this.users?.forEach((user) => {
        if (user.id == event.target.value) {
          this.selectedUser = user;
          if (this.accountNumberInput) {
            this.accountNumberInput.nativeElement.value = user.accountNumber;
          }
        }
      });
    });
  }

  decline(): void {
    this.router.navigate(['home']);
  }

  sendTransfer(transferValue: string): void {
    if (this.selectedUser) {
      this.userService
        .updateUserSaldo(this.user.id, Number(-transferValue), 0)
        .subscribe();
      this.userService
        .updateUserSaldo(this.selectedUser.id, Number(transferValue), 0)
        .subscribe();
      this.databaseService
        .saveLog(
          new Log(
            `Wysłano przelew o wartości ${Number(transferValue).toFixed(2)}PLN do ${this.selectedUser.name} ${this.selectedUser.surname}.`,
            1,
            this.user.id
          )
        )
        .subscribe();
      this.databaseService
        .saveLog(
          new Log(
            `Otrzymano przelew o wartości ${Number(transferValue).toFixed(2)}PLN od ${this.user.name} ${this.user.surname}.`,
            1,
            this.selectedUser.id
          )
        )
        .subscribe(data => this.router.navigate(['home']));
    }
  }

  setAfterTransferSaldo(transferValue: string): void {
    let value: number = Number(transferValue);
    this.afterTransferSaldo = this.user.saldo - value;
    console.log(this.user.saldo);
  }

  ngOnInit(): void {
    this.userService
      .getUserByUsername(this.userService.username)
      .subscribe((user: User) => {
        this.user = user;
        this.afterTransferSaldo = user.saldo;
        this.userService.getUsers().subscribe((users: User[]) => {
          if (users.length === 0) {
            return;
          }
          this.users = users.filter((user) => user.id !== this.user.id);
        });
      });
  }
}
