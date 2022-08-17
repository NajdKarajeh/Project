import { Router } from '@angular/router';
import { baseUrl } from './global.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class HttpHealperService {
  headers:any;


  constructor(private _HttpClient: HttpClient , private Router:Router) 
  {
    this.headers=new HttpHeaders({ 'managerId': 'managerId',})
    if(localStorage.getItem('managerId') !=null)
    {
      this.saveCurrentUser();
    }

   }

  Get(endPoint : string ,header:HttpHeaders ): Observable<any> {

    return this._HttpClient.get(baseUrl + endPoint,{headers:header})
  };

  Put(endPoint : string ,model: any , header:HttpHeaders): Observable<any> {
    return this._HttpClient.put<any>(baseUrl + endPoint, model , {headers:header})
  };
  
  Post(endPoint : string ,model: any ,header:HttpHeaders ): Observable<any> {
    return this._HttpClient.post<any>(baseUrl + endPoint, model ,{headers:header})
  };

  Delete(endPoint : string, model: any): Observable<any> 
  {
    return this._HttpClient.delete<any>(baseUrl + endPoint + model)
  };

  currentUser = new BehaviorSubject(null) ;

    saveCurrentUser()
    {
       let managerId:any = localStorage.getItem('managerId');
       this.currentUser.next((managerId))
       console.log(this.currentUser)
      //  if(managerId!=null &&managerId!="")
      //  {
      //   return true;
      //  }
      //  else
      //  {
      //   return false
      //  }
    };

    logout() 
    {
        this.currentUser.next(null);
        localStorage.removeItem('managerId');
        this.Router.navigate(['/login'])
    };

}
