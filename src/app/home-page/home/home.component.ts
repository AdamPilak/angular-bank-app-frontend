import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Log } from 'src/app/models/log.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('select') select?: ElementRef;
  user!: User;
  logs?: Log[];
  logsBackup: any[] = [];
  currencyType: string = 'PLN';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUserByUsername(this.userService.username)
      .subscribe((user) => {
        this.user = user;
        this.userService.getLogsByUserId(user.id).subscribe((logs) => {
          if (logs.length === 0) {
            this.logs = [{ description: 'Brak operacji', type: 0, userId: 0 }];
          } else {
            this.logs = logs;
          }
          this.logsBackup = logs;
        });
      });
  }

  ngAfterViewInit(): void {
    this.select?.nativeElement.addEventListener('change', (event: any) => {
      const filterType = Number(this.select?.nativeElement.value);
      switch (filterType) {
        case 0:
          this.logs = this.logsBackup.map((log) => log);
          break;
        case 1:
        case 2:
        case 3:
          this.logs = this.logsBackup.filter((log) => log.type === filterType);
          break;
      }
      if (this.logs?.length === 0) {
        this.logs = [{ description: 'Brak operacji', type: 0, userId: 0 }];
      }
    });
  }
}
