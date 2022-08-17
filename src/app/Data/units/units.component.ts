import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../services/data.service";
import Swal from 'sweetalert2';
import { getUnit } from "../services/Model";

declare let $: any;

@Component({
  selector: "app-units",
  templateUrl: "./units.component.html",
  styleUrls: ["./units.component.scss"]
})

export class UnitsComponent implements OnInit {
  term: any;
  p: any;
  isLoading = false;
  allUnits: getUnit[] = [];
  unitId: number = 0;
  modalTitle:string = "Add Unit";
  actionButton:string = "Add";

  constructor(private DataService:DataService) { }

  ngOnInit() {
    this.getAllUnits();
  };

  Form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    isNumber: new FormControl(false)
  });

  //Get All Units:
  getAllUnits() {
    this.isLoading = true;
    this.DataService.getUnits().subscribe((response) => {
      if(response.length > 0) {
        this.allUnits = response;
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
  getUnitId(id: number) {
    this.unitId = id;
  };

  //Set Unit Value:
  setUnitValue() {
    this.modalTitle = "Update Unit";
    this.actionButton = "Update";
    for (let i = 0; i < this.allUnits.length; i++) {
      if (this.allUnits[i].id == this.unitId) 
      {
        console.log(this.allUnits[i])
        this.Form.controls.id.setValue(this.allUnits[i]?.id)
        this.Form.controls.name.setValue(this.allUnits[i]?.name)
        this.Form.controls.isNumber.setValue(this.allUnits[i]?.isNumber)
      };
    };
  };

  //Add & Update Unit:
  addUnit(form:FormGroup) {
    console.log(form.value)
    this.isLoading = true;
    let submitBtn = document.getElementById('submitBtn');
    
    //Add Unit:
    if(submitBtn?.innerText == "Add") {
      this.DataService.addUnit(form.value).subscribe((response) => {
        if(response.id > 0) {
          $('#add').modal('hide')
          Swal.fire('Added Succssfly');
          this.getAllUnits();
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

    //Update Unit:
    else {
      console.log(this.Form.value);
      this.DataService.updaUnit(form.value).subscribe((response) => {
        if(response.id > 0) {
          $('#add').modal('hide')
          Swal.fire('Updated Succssfly');
          this.getAllUnits();
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

  //Delete Unit:
  deleteUnit() {
    this.isLoading = true;
    this.DataService.deleteUnit(this.unitId).subscribe((response) => {
      $('#delete').modal('hide')
      Swal.fire('Deleted Succssfly');
      this.getAllUnits();
    },
    error => {
    Swal.fire(error.error);
  }).add(() => {
  this.isLoading = false;
})
  }

  //Reset Form:
  resetForm() {
    this.modalTitle = "Add Unit";
    this.actionButton = "Add";
    this.Form.controls.name.setValue('');
  };

}
