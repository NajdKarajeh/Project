import { UnitsEndPoient } from './../services/global.service';
import { HttpHealperService } from './../services/http-helpers.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../services/data.service";
import { getItem } from "../services/Model";
import Swal from 'sweetalert2';

declare let $: any

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})

export class ItemsComponent implements OnInit {
  term: any;
  p: any;
  isLoading = false;
  allItems: getItem[] = [];
  itemID: number = 0;
  modalTitle:string = "Add Item";
  actionButton:string = "Add";
  allUnits: any;

  constructor(private DataService:DataService , private HttpHealperService: HttpHealperService) { }

  ngOnInit() {
    this.getIAllItems();
    this.getAllUnits();
  };

  Form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    unitId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required])
  });

  //Get All Items:
  getIAllItems() {
    this.isLoading = true;
    this.DataService.getItems().subscribe((response) => {
      if(response.length > 0) {
        this.allItems = response;
      }
    },
    error => {
      alert(error.message);
    })
    .add(() => {
      this.isLoading = false;
    });
  };

  //Get ID:
  getItemId(id: number) {
    this.itemID = id;
  };

  //Set Item Value:
  setItemValue() {
    this.modalTitle = "Update Item";
    this.actionButton = "Update";
    for (let i = 0; i < this.allItems.length; i++) {
      if (this.allItems[i].id == this.itemID) 
      {
        console.log(this.allItems[i])
        this.Form.controls.id.setValue(this.allItems[i]?.id)
        this.Form.controls.name.setValue(this.allItems[i]?.name)
        this.Form.controls.price.setValue(this.allItems[i]?.price)
        this.Form.controls.description.setValue(this.allItems[i]?.description)
      };
    };
  };

  //Add & Update Item:
  addItem(form:FormGroup) {
    this.isLoading = true;
    let submitBtn = document.getElementById('submitBtn');
    
    //Add Item:
    if(submitBtn?.innerText == "Add") {
      this.Form.controls.unitId.setValue(Number(this.Form.value.unitId))
      this.DataService.addItem(form.value).subscribe((response) => {
        if(response.id > 0) {
          $('#add').modal('hide')
          Swal.fire('Added Succssfly');
          this.getIAllItems();
          this.Form.reset();
        }
      },
         error => {
          Swal.fire(error.error);
      })
      .add(() => {
        this.isLoading = false;
      })
    }

    //Update Item:
    else {
      console.log(this.Form.value);
      this.DataService.updateItem(form.value).subscribe((response) => {
        if(response.id > 0) {
          $('#add').modal('hide')
          Swal.fire('Updated Succssfly');
          this.getIAllItems();
          this.Form.reset();
        }
      },
         error => {
          Swal.fire(error.error);
      })
      .add(() => {
        this.isLoading = false;
      })
    }
  };

  //Delete Item:
  deleteItem() {
    this.isLoading = true;
    this.DataService.deleteItem(this.itemID).subscribe((response) => {
      $('#delete').modal('hide')
      Swal.fire('Deleted Succssfly');
      this.getIAllItems();
    },
    error => {
    Swal.fire(error.error);
  }).add(() => {
  this.isLoading = false;
})
  }

  //Reset Form:
  resetForm() {
    this.modalTitle = "Add Item";
    this.actionButton = "Add";
    this.Form.reset();
  };

  filterUnit(event: any) 
  {
    let x = event.target.value;
    console.log(x)
  };

  getAllUnits() {
    let header = new HttpHeaders({
      'managerId': localStorage.getItem("managerId") ?? ""
    });
    this.isLoading = true;

    this.HttpHealperService.Get(UnitsEndPoient.get, header).subscribe(({
      next: responce => {

        this.allUnits = responce;
        this.isLoading = false;

        console.log(this.allUnits);

      },
      error: error => {
        alert(error.message);
        this.isLoading = false;
      }
    }))

  };

}
