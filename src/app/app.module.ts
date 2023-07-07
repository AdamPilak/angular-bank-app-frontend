import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import {
  routes as childRoutes,
  HomePageModule,
} from './home-page/home-page.module';
import { LoggedInGuard } from './login/logged-in.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'newUser', component: NewUserComponent },
  {
    path: 'home',
    component: HomePageComponent,
    children: childRoutes,
    canActivate: [LoggedInGuard]
  },
];

@NgModule({
  declarations: [AppComponent, HomePageComponent, LoginComponent, NewUserComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
