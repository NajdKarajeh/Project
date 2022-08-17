import Swal from 'sweetalert2';
import { ItemsEndPoient } from './../../services/global.service';
import { HttpHealperService } from './../../services/http-helpers.service';
import { HttpHeaders } from '@angular/common/http';
import { DataService } from './../../services/data.service';
import { itemModel } from './../../services/Model';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output , OnDestroy} from "@angular/core";


declare let $ :any;

@Component({
  selector: "app-form-select",
  templateUrl: "./form-select.component.html",
  styleUrls: ["./form-select.component.scss"]
})

export class FormSelectComponent implements OnInit {
  discountMatch:boolean = false;

  itemsContainer: itemModel[] = [];
  allUnits: any;
  allItems:any;
  isLoading = false;
  totalCost:number = 0;
  @Output() outColectItems = new EventEmitter<itemModel>();
  constructor(private DataService:DataService , private HttpHealperService: HttpHealperService ) {  }

  ItemForm = new FormGroup({
    itemId: new FormControl(null, [Validators.required]),
    count: new FormControl(0, [Validators.required]),
    discount: new FormControl(0, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    apdTotalCost: new FormControl(0)
  })

  
  collectItems(form:FormGroup)
   {
    this.totalCost = 0;
    this.ItemForm.controls.itemId.setValue(Number(this.ItemForm.value.itemId))
    this.ItemForm.controls.count.setValue(Number(this.ItemForm.value.count))
    this.ItemForm.controls.discount.setValue(Number(this.ItemForm.value.discount))
    this.ItemForm.controls.price.setValue(Number(this.ItemForm.value.price))

    this.totalCost = (Number(this.ItemForm.value.count)*Number(this.ItemForm.value.price))-Number(this.ItemForm.value.discount);
    this.ItemForm.controls['apdTotalCost'].setValue(this.totalCost);
    this.outColectItems.emit(form.value);
    $('#add-2').modal('hide');
    this.ItemForm.controls.itemId.setValue('')
    this.ItemForm.controls.count.setValue(0)
    this.ItemForm.controls.discount.setValue(0)
    this.ItemForm.controls.price.setValue(0)
   
   };

   filterUnit(event: any) 
   {
     let x = event.target.value;
     console.log(x)
   };


   getAllItems() {
    let header = new HttpHeaders({
      'managerId': localStorage.getItem("managerId") ?? ""
    });
    this.isLoading = true;

    this.HttpHealperService.Get(ItemsEndPoient.get, header).subscribe(({
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

  checkDiscount() {
    if(this.ItemForm.controls['price'].value <= this.ItemForm.controls['discount'].value) {
      Swal.fire('Invalid Discount Value !');

     } 
      
    
  }

 


  ngOnInit()
   {
      
      this.getAllItems() ;
  }

 
}
