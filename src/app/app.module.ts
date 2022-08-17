import { FormSelectComponent } from './Data/invoices/form-select/form-select.component';
import { ReportComponent } from './Data/report/report.component';
import { ConsumerComponent } from './Data/consumer/consumer.component';
import { ItemsComponent } from './Data/items/items.component';
import { UnitsComponent } from './Data/units/units.component';
import { StockComponent } from './Data/stock/stock.component';
import { InvoicesComponent } from './Data/invoices/invoices.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HeaderComponent } from './Data/header/header.component';
import { MenuComponent } from './Data/menu/menu.component';
import { FooterComponent } from './Data/footer/footer.component';


import { RouterModule } from '@angular/router';
import { HomeComponent } from './Data/home/home.component';
import { SupplierComponent } from './Data/supplier/supplier.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RegisterComponent } from './Data/Auth/register/register.component';
import { LoginComponent } from './Data/Auth/login/login.component';
import { AddItemComponent } from './Data/consumer/add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    SupplierComponent,
   RegisterComponent,
   LoginComponent,
   InvoicesComponent,
   StockComponent,
   UnitsComponent,
   ItemsComponent,
   ConsumerComponent,
   ReportComponent,
   FormSelectComponent,
   AddItemComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    SweetAlert2Module.forRoot(),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
