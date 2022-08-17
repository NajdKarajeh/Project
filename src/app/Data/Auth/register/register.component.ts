import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressEndPoient, ManagerEndPoient } from '../../services/global.service';
import { HttpHealperService } from '../../services/http-helpers.service';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public file: any;
  allAdress:any;
  isLoading = false;
  public searchElementRef!: ElementRef;

  registerForm = new FormGroup({
    'userName': new FormControl('' , [Validators.required ]),
    'email': new FormControl('' , [Validators.email ]),
    'password': new FormControl('' , [Validators.required ]),
    'phoneNumber': new FormControl('' ,[Validators.required , Validators.minLength(3),Validators.maxLength(10)]),
    'addressId' : new FormControl(0),

  });
  constructor(private HttpHealperService:HttpHealperService ,
    private Router:Router,
    private cdRef:ChangeDetectorRef ,) { }

    submitRigisterForm()
    {
      let header=new HttpHeaders({
        'managerId':localStorage.getItem("managerId")??""
      });

      let model =  
      {
        "userName": this.registerForm.value.userName ,
        "email" : this.registerForm.value.email,
        "password" : this.registerForm.value.password,
        "phoneNumber" : this.registerForm.value.phoneNumber,
        'addressId':Number(this.registerForm.value.addressId)
      }

      this.HttpHealperService.Post(ManagerEndPoient.post,model , header).subscribe(({
        next:response=>
        {
          console.log(response)
          console.log(this.registerForm.value)
          Swal.fire('Register Succssfly');
          this.Router.navigate(['/login'])
        },
        error:error =>
        {
          console.log(error)
        }
      }))
    }

    getAllAdresrs()
  {
    let header=new HttpHeaders({
      'managerId':localStorage.getItem("managerId")??""
    });
    this.isLoading = true ;

    this.HttpHealperService.Get(AddressEndPoient.get, header).subscribe(({
      next: responce => {

        this.allAdress = responce;
        this.isLoading = false ;

        console.log( this.allAdress);

      },
      error: error => 
      {
        alert(error.message);
        this.isLoading = false;
      } 
  }));
       };

       filterCity(event:any)
       {
         let x = event.target.value;
         console.log(x)
       };

  ngOnInit() 
  {
    this.getAllAdresrs();
  };

};
