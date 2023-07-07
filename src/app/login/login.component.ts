import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  get username(): any {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): any {
    return this.loginForm.get('password') as FormControl;
  }

  checkUser(username: string, password: string): void {
    this.authService
      .checkIfUserExists(username)
      .subscribe((status: boolean) => {
        if (status) {
          this.authService.setUnknownUser(username, password);
          this.loginUser();
        } else {
          this.loginForm.controls.username.setErrors({ invalid: true });
          this.loginForm.controls.password.setErrors({ invalid: true });
        }
      });
  }

  loginUser(): void {
    this.authService
      .checkIfUserIsValid(this.authService.unknownUser)
      .subscribe((status: number) => {
        this.authService.isUserValid = status !== 0;
        if (this.authService.isUserValid) {
          this.authService.setLocalStorageUser();
          this.router.navigate(['home']);
        } else {
          this.loginForm.controls.username.setErrors({ invalid: true });
          this.loginForm.controls.password.setErrors({ invalid: true });
        }
      });
  }

  navigateToNewUser(): void {
    this.router.navigate(['newUser']);
  }
}
