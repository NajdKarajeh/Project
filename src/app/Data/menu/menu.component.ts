import { HttpHealperService } from './../services/http-helpers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLogin:boolean = false;

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


  };

  
  isLogOut()
  {
    this.HttpHealperService.logout();
  };

  ngOnInit(): void {
  }

}
