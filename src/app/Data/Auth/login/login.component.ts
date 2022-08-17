import { ManagerEndPoient } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginEndPoient } from '../../services/global.service';
import { HttpHealperService } from '../../services/http-helpers.service';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginButton:boolean=false;
  showPassword: boolean = false;

  constructor(private HttpHealperService:HttpHealperService ,
    private Router:Router,) { };

  loginForm = new FormGroup({
    "userName" : new FormControl('' , [Validators.required ]),
    "password" : new FormControl ('' , [Validators.required ])
  });


   submitLogin() {
    let header=new HttpHeaders({
      'managerId':localStorage.getItem("managerId")??""
    });

   let model =  
   {
     "userName": this.loginForm.value.userName ,
     "password" : this.loginForm.value.password
   }
  
     this.HttpHealperService.Post(ManagerEndPoient.Post, model , header).subscribe(({
       next:response =>
       {
          // Swal.fire('Login Succssfly');
           localStorage.setItem('managerId', response.managerId);
           localStorage.setItem('username' , response.username)
           this.HttpHealperService.saveCurrentUser();
           this.Router.navigate(['/supplier']);
           console.log(response)

     },
     error:error=>
     {
       Swal.fire(error)
     }

     }));
  
   };
  public togglePassword() 
  {
    this.showPassword = !this.showPassword;
  };



  ngOnInit()
  {
  };

};
