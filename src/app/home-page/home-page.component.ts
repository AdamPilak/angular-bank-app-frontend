import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {}

  navigate(type: string): void {
    this.router.navigate([`./${type}`], { relativeTo: this.activatedRoute });
  }

  logout(): void {
    localStorage.clear();
    this.authService.isUserValid = false;
    this.router.navigate(['login']);
  }
}
