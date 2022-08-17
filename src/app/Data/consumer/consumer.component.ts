import { DataService } from './../services/data.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpHealperService } from './../services/http-helpers.service';
import { ConsumingEndPoient, ItemsStockEndPoient } from './../services/global.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import Swal from 'sweetalert2';

declare let $ :any;
@Component({
  selector: "app-consumer",
  templateUrl: "./consumer.component.html",
  styleUrls: ["./consumer.component.scss"]
})

export class ConsumerComponent implements OnInit {
  term: any;
  p: any;
  isLoading = false;
  allConsuming:any;
  consumerItems:any = [];

   
  addConsumer = new FormGroup(
    {
      "date": new FormControl(null, [Validators.required]),
    });
  itemName: any;
  allItems: any;

  constructor(private HttpHealperService: HttpHealperService, private DataService:DataService) { 

  }

  getAllConsumer() {
    let header = new HttpHeaders({
      'managerId': localStorage.getItem("managerId") ?? ""
    });

    this.isLoading = true;

    this.HttpHealperService.Get(ConsumingEndPoient.get, header).subscribe(({
      next: responce => {

        this.allConsuming = responce;
        this.isLoading = false;
        this.allConsuming=this.allConsuming.reverse();
        console.log(this.allConsuming);

      },
      error: error => {
        alert(error.message);
        this.isLoading = false;
      }
    }));

  };

  collectItems(form:any) {
    this.consumerItems?.push(form);
    this.DataService.consumerItems = this.consumerItems;
    $('#add-2').modal('hide');
};

submitForm(form:FormGroup) {
  let header = new HttpHeaders({
    'managerId': localStorage.getItem("managerId") ?? ""
  });
  this.addConsumer.addControl('items', new FormControl(this.consumerItems));

  this.HttpHealperService.Post(ConsumingEndPoient.post,form.value,header).subscribe(({
    next:res=>
    {
      
       
        Swal.fire('Added Successfully');
       this.getAllConsumer();
        $('#add').modal('hide');
       
   
       
    },
    error: error => {
      alert(error.message);
      this.isLoading = false;
    }
  }))
  console.log(form);
};

getAllItems() {
  let header = new HttpHeaders({
    'managerId': localStorage.getItem("managerId") ?? ""
  });
  this.isLoading = true;

  this.HttpHealperService.Get(ItemsStockEndPoient.get, header).subscribe(({
    next: responce => {

      this.allItems = responce;
      this.isLoading = false;

      console.log(this.allItems);

    },
    error: error => {
      alert(error.message);
      this.isLoading = false;
    }
  }))

};

getItemName(itemId:number) {
  this.itemName = this.allItems?.find((el:any) => el.id == itemId)
  return this.itemName?.name;
}

  ngOnInit() 
  {
    this.getAllConsumer();
    this.getAllItems();
  }
}
