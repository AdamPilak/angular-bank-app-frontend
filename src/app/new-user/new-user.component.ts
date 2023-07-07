import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from '../models/newUser.model';
import { DatabaseService } from '../services/database.service';
import { UserService } from '../services/user.service';
import { passwordValidator } from './password.validator';
import { peselValidator } from './pesel.validator';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  newUser?: NewUser;
  newUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, passwordValidator])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    pesel: new FormControl('', Validators.compose([Validators.required, peselValidator])),
    phoneNumber: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  get name(): any {
    return this.newUserForm.get('name') as FormControl;
  }

  get surname(): any {
    return this.newUserForm.get('surname') as FormControl;
  }

  get username(): any {
    return this.newUserForm.get('username') as FormControl;
  }

  get password(): any {
    return this.newUserForm.get('password') as FormControl;
  }

  get email(): any {
    return this.newUserForm.get('email') as FormControl;
  }

  get pesel(): any {
    return this.newUserForm.get('pesel') as FormControl;
  }

  get phoneNumber(): any {
    return this.newUserForm.get('phoneNumber') as FormControl;
  }

  decline(): void {
    this.router.navigate(['login']);
  }

  saveNewUser(): void {
    if (this.newUserForm.invalid) {
      this.newUserForm.controls.name.markAsDirty();
      this.newUserForm.controls.surname.markAsDirty();
      this.newUserForm.controls.username.markAsDirty();
      this.newUserForm.controls.password.markAsDirty();
      this.newUserForm.controls.email.markAsDirty();
      this.newUserForm.controls.pesel.markAsDirty();
      this.newUserForm.controls.phoneNumber.markAsDirty();
      return;
    };
    let accountNumber: string = '';
    for (let i = 0; i < 26; i++) {
      accountNumber += Math.floor(Math.random() * 10);
    }
    let day = this.pesel.value.slice(4, 6);
    let month = this.pesel.value.slice(2, 4);
    if (month.at(0) === '2') {
      month = '0'+month.at(1);
    } else if (month.at(0) === '3') {
      month = '1'+month.at(1);
    }
    let year = this.pesel.value.slice(0, 2);
    if (Number(year) > 22) {
      year = '19'+year;
    } else {
      year = '20'+year;
    }
    let birthdate = `${year}-${month}-${day}`
    let sex;
    if (this.pesel.value.at(9) % 2 !== 0) {
      sex = 'Mężczyzna';
    } else {
      sex = 'Kobieta';
    }
    this.userService
      .saveUser(
        new NewUser(0, this.name.value, this.surname.value, this.username.value, this.password.value, this.email.value, this.pesel.value, birthdate, sex, this.phoneNumber.value, accountNumber, 1000, 0)
      )
      .subscribe((data) => this.router.navigate(['login']));
  }
}
