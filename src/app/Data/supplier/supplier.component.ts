import { SupplierEndPoint } from './../services/global.service';
import { HttpHealperService } from './../services/http-helpers.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';

declare let $: any
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  allSuppliers:any;
  term :any ;
  allSuppliersFilter:any ; 
  allUsers:any ; 
  isLoading = false;
  supplierId: any
  p:any
  constructor(private HttpHealperService:HttpHealperService ) { }

  addSupplier= new FormGroup(
    {
    "supplierName": new FormControl(''),
    "supplierPhone": new FormControl('', [Validators.min(10) , Validators.max(10) , Validators.required , Validators.pattern('^[0-9]{0,10}$')]),
    "supplierNumber": new FormControl(0),
    "supplierLocation": new FormControl(''),
    });

    updateSupplier= new FormGroup(
      {
      "supplierId":new FormControl(),
      "supplierName": new FormControl(''),
      "supplierPhone": new FormControl('' , [Validators.min(10) , Validators.max(10) , Validators.required , Validators.pattern('^[0-9]{0,10}$')]),
      "supplierNumber": new FormControl(0),
      "supplierLocation": new FormControl(''),
      });

      deleteSupplier = new FormGroup({

        Id: new FormControl(null),
      
      })

    getAllSuppliers()
  {
    let header=new HttpHeaders({
      'managerId':localStorage.getItem("managerId")??""
    });
    this.isLoading = true ;

    this.HttpHealperService.Get(SupplierEndPoint.GetAllSupplier,header).subscribe(({
      next: responce => {

        this.allSuppliers = responce;
        this.isLoading = false ;

        console.log( this.allSuppliers);

      },
      error: error => 
      {
        alert(error.message);
        this.isLoading = false;
      } 
  }))

       };

    addedData() 
  {
    let header=new HttpHeaders({
      'managerId':localStorage.getItem("managerId")??""
    });

    if(    this.addSupplier.value.supplierName==''||this.addSupplier.value.supplierPhone=='' 
      || this.addSupplier.value.supplierNumber==''||this.addSupplier.value.supplierLocation=='')

    {
      Swal.fire('Please Complete All Filds');
    }
    else if
    (this.addSupplier.value.supplierPhone.length<10)
    {
     Swal.fire('Max and min lenght Supplier Phone is 10');
     return ;
    }
   
    else{
      let model =  
      {
        "supplierName": this.addSupplier.value.supplierName ,
        "supplierPhone" : this.addSupplier.value.supplierPhone,
        "supplierNumber" : this.addSupplier.value.supplierNumber,
        "supplierLocation" : this.addSupplier.value.supplierLocation,
      }
    
      this.isLoading= true;
    
     
      this.HttpHealperService.Post(SupplierEndPoint.Add, model , header).subscribe(({
        next : response =>
        {      
          this.allSuppliers = response;
  
          $('#add').modal('hide')
          Swal.fire('Added Succssfly');
          this.getAllSuppliers();
          this.addSupplier.reset();
          this.isLoading = false;
        },
        error: error => {
          Swal.fire(error.error);

        this.isLoading = false;
      } 
      }));
    }
    
     };

 

    getId(supplierId: any)
     {
    this.supplierId = supplierId ;
    console.log(this.supplierId) ;
     };

   setValue()
   {

    let header=new HttpHeaders({
      'managerId':localStorage.getItem("managerId")??""
    });
    for (let i = 0; i < this.allSuppliers.length; i++) {

      if (this.allSuppliers[i].supplierId == this.supplierId) 
      {
        console.log(this.allSuppliers[i])
        this.updateSupplier.controls.supplierId.setValue(this.allSuppliers[i]?.supplierId)
        this.updateSupplier.controls.supplierName.setValue(this.allSuppliers[i]?.supplierName)
        this.updateSupplier.controls.supplierPhone.setValue(this.allSuppliers[i]?.supplierPhone)
        this.updateSupplier.controls.supplierNumber.setValue(this.allSuppliers[i]?.supplierNumber)
        this.updateSupplier.controls.supplierLocation.setValue(this.allSuppliers[i]?.supplierLocation)
      
      };
      console.log(this.supplierId)
   
    };

     };

   editData() 
  {
    let header=new HttpHeaders({
      'managerId':localStorage.getItem("managerId")??""
    });
   console.log(this.updateSupplier.value.supplierPhone)
    if(this.updateSupplier.value.supplierPhone?.length <10)
    {
      Swal.fire('Max and min lenght Supplier Phone is 10');
    }
    else
    {
      let model =
      {
        "supplierId": this.supplierId,
        "supplierName": this.updateSupplier.value.supplierName,
        "supplierPhone": this.updateSupplier.value.supplierPhone,
        "supplierNumber": this.updateSupplier.value.supplierNumber,
        "supplierLocation": this.updateSupplier.value.supplierLocation,
      }
  
      this.isLoading = true;
  
      this.HttpHealperService.Put(SupplierEndPoint.Update ,<any> model ,header).subscribe(({
        next : response => 
        {            
          Swal.fire('Updated Succssfly');

          this.getAllSuppliers();
          console.log("done");
          $('#edit').modal('hide')
  
          this.isLoading = false;
  
        },
        error: error => {
          alert(error.error);
          this.isLoading = false;
  
      } 
      }))
    }


   };

   deleteSuppl() {
    let header=new HttpHeaders({
      'managerId':localStorage.getItem("managerId")??""
    });
    this.HttpHealperService.Delete(SupplierEndPoint.Delete, this.supplierId).subscribe((res) => {

      console.log("done")

      this.HttpHealperService.Get(SupplierEndPoint.GetAllSupplier,header).subscribe((data) => {
        this.isLoading = false;
        $('#delete').modal('hide')
        Swal.fire('Deleted Succssfly');

           this.getAllSuppliers();
        this.allSuppliers = data;
        console.log(this.allSuppliers);
      });
  

    },(err) => {
        console.log("error")
    }
    );
  };

  search(event:any)
  {
    const value = event.target.value;
    this.allSuppliersFilter = this.allSuppliers.filter((supplier:any)=>
     supplier.supplierName.toLowerCase().includes(value)
    )
    console.log(value)
  };

  ngOnInit()
  {
    this.getAllSuppliers();
  }

}
