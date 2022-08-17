import { HttpHeaders } from '@angular/common/http';
import { ReportEndPoient } from './../services/global.service';
import { HttpHealperService } from './../services/http-helpers.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"]
})

export class ReportComponent implements OnInit {
  term: any;
  p: any;
  isLoading = false;
  invoices: any;
  stock: any;
  sales: any;

  constructor(private HttpHealperService: HttpHealperService) { 

  }

  ngOnInit() {

  }

  report =  new FormGroup({
    from: new FormControl(null, [Validators.required]),
    to: new FormControl(null, [Validators.required])
  })

  getReport(form:FormGroup) {
    console.log(form.value)
    let header = new HttpHeaders({
      'managerId': localStorage.getItem("managerId") ?? ""
    });
    this.HttpHealperService.Post(ReportEndPoient.post ,form.value ,header ).subscribe(({
      next:res =>
      {
           console.log(res)
           this.invoices = res.invoices;
           this.stock = res.stock;
           this.sales = res.sales;
      }
    }))
  }
}
