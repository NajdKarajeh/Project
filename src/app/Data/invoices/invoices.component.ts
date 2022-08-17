import { DataService } from './../services/data.service';
import { itemModel, itemModelName } from './../services/Model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { InvoicesEndPoient, SupplierEndPoint, UnitsEndPoient, ItemsEndPoient } from './../services/global.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpHealperService } from './../services/http-helpers.service';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import Swal from 'sweetalert2';
declare let $: any

@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  styleUrls: ["./invoices.component.scss"]
})

export class InvoicesComponent implements OnInit {
  currentInvoice: any;
  itemsContainer:any = [];
  // storeditems: itemModel[] = [];
  itemsTable:itemModelName[]=[];
  allInvoices: any;
  allSuppliers: any;
  allUnits: any;
  allItems:any;
  isLoading = false;
  term: any;
  p: any;
  v:any;
  base64: any;
  itemName: any;
  unitName:any;
  itemId:any;
  public file: any;
  url:any;
  form!:FormGroup
  totalPurchase:any = 0;
  baseImg:String = 'https://localhost:44303';

  addInvoice = new FormGroup(
    {
      "supplierId": new FormControl(null, [Validators.required]),
      "totalPurchase": new FormControl(0),
      "invoiceDate": new FormControl(null, [Validators.required]),
      "image": new FormControl(null),
    });
  imgUrl: any;
  invoiceId: number=0;
    

  constructor(private HttpHealperService: HttpHealperService , private cdRef:ChangeDetectorRef , private build:FormBuilder,private DataService:DataService , ) { };
  
  submitInvoicesForm(addInvoice:FormGroup)
  {
    let header=new HttpHeaders({
      'managerId':localStorage.getItem("managerId")??""
    });
     if(this.addInvoice.value.supplierId==''|| this.addInvoice.value.invoiceDate==''
        ||this.addInvoice.value.image==''|| this.itemsContainer.length == 0 || this.file == undefined)
     {
       Swal.fire('Please Complete All Feilds')
       return ;
     }
     else
     {
      const formData= new FormData();

      formData.append('supplierId' , this.addInvoice.value.supplierId);
      formData.append('invoiceDate' , this.addInvoice.value.invoiceDate);
      formData.append('items' ,JSON.stringify(this.itemsContainer));
      formData.append('totalPurchase' , this.totalPurchase);
    
    
      if(this.file != null){
        formData.append("image", this.file, this.file.name);
      }
         this.HttpHealperService.Post(InvoicesEndPoient.post , formData, header).subscribe(({
           next:response =>
           {
            Swal.fire('Invoice Add Successfully');
            this.getAllInvoices();
            $('#add').modal('hide');
            
    
          },
           error: error => {
            console.log(error);
         
            Swal.fire(error);
            this.isLoading = false;
          } 
         })).add(() => {
          this.itemsContainer = [];
          this.totalPurchase = 0;
          this.addInvoice.reset();
          this.url = '';
         });
     }
  };
    

  getAllInvoices() {
    let header = new HttpHeaders({
      'managerId': localStorage.getItem("managerId") ?? ""
    });

    this.isLoading = true;

    this.HttpHealperService.Get(InvoicesEndPoient.get, header).subscribe(({
      next: responce => {

        this.allInvoices = responce;
        this.isLoading = false;
        this.allInvoices=this.allInvoices.reverse();
        console.log(this.allInvoices);

      },
      error: error => {
        alert(error.message);
        this.isLoading = false;
      }
    }));

  };

  getAllSuppliers() {
    let header = new HttpHeaders({
      'managerId': localStorage.getItem("managerId") ?? ""
    });
    this.isLoading = true;

    this.HttpHealperService.Get(SupplierEndPoint.GetAllSupplier, header).subscribe(({
      next: responce => {

        this.allSuppliers = responce;
        this.isLoading = false;

        console.log(this.allSuppliers);

      },
      error: error => {
        alert(error.message);
        this.isLoading = false;
      }
    }))

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

    getImagePath(event: any)
    {
      const file = event.target.files[0];
      const reader = new FileReader;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64 = reader.result;
        this.addInvoice.get('image')?.setValue('image');
        console.log(this.base64)
      }
    };

  onFileChanged(event: any) {
    this.file = event.target.files[0];
    this.url = event.target.result;
  
   if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
  
          reader.onload = (event:any) => {
            this.url = reader.result
            this.cdRef.detectChanges();
          }
  
          reader.readAsDataURL(event.target.files[0]);
  
      };
  };

  filterUnit(event: any) 
  {
    let x = event.target.value;
    console.log(x)
  };

  filterSupplier(event: any)
  {
    let x = event.target.value;
    console.log(x)
  };

  // getStoreItems()
  // {
  //    this.storeditems = JSON.parse(localStorage.getItem('items') || '') 
  //    this.storeditems.forEach(item => item.itemId*=1);
  //    this.storeditems.forEach(item => item.unitId*=1);
  //    this.storeditems.forEach(item => item.count*=1);
  //    this.storeditems.forEach(item => item.amount*=1);
  //    console.log(this.storeditems)
  //  }

   deleteItem(productIndex:any){
     
    // this.storeditems.splice(productIndex,1);
    // localStorage.setItem("items", JSON.stringify(this.storeditems));
    // $('#delete').modal('hide');

    // this.getStoreItems();

};

viewInvoice(id:number) {
  this.currentInvoice = this.allInvoices.find((el:any) => el.invoiceId == id);
  console.log(this.currentInvoice);
  //  this.supplierName = supplier;
   this.imgUrl = this.baseImg + this.currentInvoice?.url;
};

getID(id:number) {
  this.invoiceId= id;
}

deleteInvoice() {
  let header=new HttpHeaders({
    'managerId':localStorage.getItem("managerId")??""
  });
  this.HttpHealperService.Delete(InvoicesEndPoient.delete, this.invoiceId).subscribe((res) => {
      this.getAllInvoices();
      Swal.fire('Invoice Deleted Successfully');

      $('#delete').modal('hide');

  }
  );
};

  ngOnInit() 
  {
    this.getAllInvoices();
    this.getAllSuppliers();
    this.getAllUnits();
    this.getAllItems();
  };

  ItemForm = new FormGroup({
    itemId: new FormControl(null, [Validators.required]),
    count: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    unitId: new FormControl(null, [Validators.required]),
  })

  getItemName(itemId:number) {
    this.itemName = this.allItems?.find((el:any) => el.id == itemId)
    return this.itemName?.name;
  }

  getUnitName(unitId:number) {
    this.unitName = this.allUnits?.find((el:any) => el.id == unitId)
    return this.unitName?.name;
  }

  resetForm()
  {
    this.ItemForm.reset()
  };

  collectItems(form:any) {
        this.itemsContainer?.push(form);
        this.DataService.itemsCountainer = this.itemsContainer
        this.totalPurchase = this.DataService.itemsCountainer.reduce(function(acc:any, obj:any) { return acc + obj.apdTotalCost},0)
        $('#add-2').modal('hide');
  };
};
 