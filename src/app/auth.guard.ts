import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHealperService } from '../app/Data/services/http-helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  constructor(private HttpHealperService:HttpHealperService ,
    private Router:Router)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      if(this.HttpHealperService.currentUser.getValue()!= null)
      {
         return true ;
      }
      else
      {
        this.Router.navigate(['/login'])
        return false ;
      }
   return true;
  }
  
}
