import { ItemsEndPoient, ItemsStockEndPoient } from './../../services/global.service';
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
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"]
})

export class AddItemComponent implements OnInit {
  
  itemsContainer: itemModel[] = [];
  
  allItems:any;
  isLoading = false;
  @Output() outColectItems = new EventEmitter<itemModel>();

  constructor(private DataService:DataService , private HttpHealperService: HttpHealperService ) {  }

  ItemForm = new FormGroup({
    itemId: new FormControl(null, [Validators.required]),
    count: new FormControl(null, [Validators.required]),
  })

  
  collectItems(form:FormGroup)
   {
    this.ItemForm.controls.itemId.setValue(Number(this.ItemForm.value.itemId))
    this.ItemForm.controls.count.setValue(Number(this.ItemForm.value.count))

    this.outColectItems.emit(form.value);
    $('#add-2').modal('hide');
    this.ItemForm.controls.itemId.setValue('')
    this.ItemForm.controls.count.setValue(0);
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


  ngOnInit()
   {
      this.getAllItems() ;
  }

}
