import { AddressEndPoient, ManagerEndPoient } from './../services/global.service';
import { HttpHealperService } from '../services/http-helpers.service';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:boolean = false;
  isLoading = false;
  allManager:any;
  userName:any;
  islog:string=''
  managerId:any;
  constructor(private HttpHealperService:HttpHealperService , ) 
  
  {
    HttpHealperService.currentUser.subscribe(()=>{
      if(HttpHealperService.currentUser.getValue() != null)
      {
         this.isLogin = true;
      }
      else
      {
        this.isLogin = false ;
      };
    });


  }

  getAllManager()
  {
    let header=new HttpHeaders({
      'managerId':localStorage.getItem("managerId")??""
    });
    this.isLoading = true ;

    this.HttpHealperService.Get(ManagerEndPoient.GetAllManger,header).subscribe(({
      next: responce => {

        this.allManager = responce;
        // this.userName = this.allManager?.userame;
        this.isLoading = false ;

        console.log( this.allManager);

      },
      error: error => 
      {
        alert(error.message);
        this.isLoading = false;
      } 
  }));
       };


  isLogOut()
  {
    
    this.HttpHealperService.logout();
    localStorage.clear();
  };

  


  ngOnInit(): void
   {
    this.getAllManager();
    this.userName = localStorage.getItem('username')
  };

};
