import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TransferComponent } from './transfer/transfer.component';
import { CurrencyConversionComponent } from './currency-conversion/currency-conversion.component';
import { CreditComponent } from './credit/credit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'transfers', component: TransferComponent },
  { path: 'currency-conversion', component: CurrencyConversionComponent },
  { path: 'credit', component: CreditComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    CurrencyConversionComponent,
    TransferComponent,
    CreditComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class HomePageModule {}
