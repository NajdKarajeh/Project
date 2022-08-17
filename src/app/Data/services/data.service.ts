import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ItemsEndPoient, UnitsEndPoient } from './global.service';
import { HttpHealperService } from './http-helpers.service';
import { addItem, getItem, getUnit } from './Model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  itemsCountainer: any;
  consumerItems:any;

  constructor(private HttpHealperService:HttpHealperService) { }

  //Header:
  header = new HttpHeaders({
    'managerId':localStorage.getItem("managerId")??""
  });

  ///// Items API:
  //1-Get Items:
  getItems(): Observable<getItem[]> {
    return this.HttpHealperService.Get(ItemsEndPoient.get,this.header)
  };

  //2-Add Item:
  addItem(Model:addItem): Observable<getItem> {
    return this.HttpHealperService.Post(ItemsEndPoient.post,Model,this.header)
  }

  //3-Update Item:
  updateItem(Model:getItem): Observable<getItem> {
    return this.HttpHealperService.Put(ItemsEndPoient.update,Model,this.header)
  };

  //4-Delete Item:
  deleteItem(id:number): Observable<any> {
    return this.HttpHealperService.Delete(ItemsEndPoient.delete, id)
  };


  ///// Units API:
  //1-Get Units:
  getUnits(): Observable<getUnit[]> {
    return this.HttpHealperService.Get(UnitsEndPoient.get,this.header)
  };

  //2-Add Unit:
  addUnit(Model:addItem): Observable<getUnit> {
    return this.HttpHealperService.Post(UnitsEndPoient.post,Model,this.header)
  }

  //3-Update Unit:
  updaUnit(Model:getUnit): Observable<getUnit> {
    return this.HttpHealperService.Put(UnitsEndPoient.put,Model,this.header)
  };

  //4-Delete Unit:
  deleteUnit(id:number): Observable<any> {
    return this.HttpHealperService.Delete(UnitsEndPoient.delete, id)
  };

}
