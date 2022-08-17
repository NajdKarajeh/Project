import { StockEndPoient } from './../services/global.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpHealperService } from './../services/http-helpers.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"]
})

export class StockComponent implements OnInit {
  allStock:any;
  isLoading = false;
  term :any ;
  p:any;

  constructor(private HttpHealperService:HttpHealperService) { };

  getAllStock()
  {
    let header=new HttpHeaders({
      'managerId':localStorage.getItem("managerId")??""
    });

    this.isLoading = true ;

    this.HttpHealperService.Get(StockEndPoient.get,header).subscribe(({
      next: responce => {

        this.allStock = responce;
        this.isLoading = false ;

        console.log( this.allStock);

      },
      error: error => 
      {
        alert(error.message);
        this.isLoading = false;
      } 
  }));

       };

  ngOnInit()
  {
    this.getAllStock();
  };
};
