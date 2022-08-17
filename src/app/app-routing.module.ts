import { ConsumerComponent } from './Data/consumer/consumer.component';
import { ReportComponent } from './Data/report/report.component';
import { ItemsComponent } from './Data/items/items.component';
import { UnitsComponent } from './Data/units/units.component';
import { InvoicesComponent } from './Data/invoices/invoices.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './Data/Auth/login/login.component';
import { RegisterComponent } from './Data/Auth/register/register.component';
import { HomeComponent } from './Data/home/home.component';
import { NotfoundComponent } from './Data/notfound/notfound.component';
import { SupplierComponent } from './Data/supplier/supplier.component';
import { StockComponent } from './Data/stock/stock.component';


const routes: Routes = [
   {path:'', redirectTo:'supplier', pathMatch:'full' },  
   { path:'home', canActivate:[AuthGuard] ,component: HomeComponent },  
   { path:'supplier',canActivate:[AuthGuard] , component: SupplierComponent },  
   { path:'invoices',canActivate:[AuthGuard] , component: InvoicesComponent },  
   { path:'stock',canActivate:[AuthGuard] , component: StockComponent },  
   { path:'units',canActivate:[AuthGuard] , component: UnitsComponent },  
   { path:'items',canActivate:[AuthGuard] , component: ItemsComponent },  
   { path:'report',canActivate:[AuthGuard] , component: ReportComponent },  
   { path:'consumer',canActivate:[AuthGuard] , component: ConsumerComponent },  
   { path:'login', component: LoginComponent },  
   { path:'register', component: RegisterComponent },  
   {path:'**', component:NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


