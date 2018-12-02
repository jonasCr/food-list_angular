import { Menu } from "../../shared/models/menu.model";
import { Observable, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { query } from "../../shared/models/query.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { MenuData } from "./../../data/menu.data";
import { Timestamp } from "rxjs/internal/operators/timestamp";

@Injectable({
  providedIn: 'root',
})


export class MenuListService{
    listMenu:Observable<Menu[]>;
    menuObs:Subscription;

    constructor(
            public _db:AngularFirestore,
            public _menuData:MenuData
        ){
        let query:query = this._menuData.getRangeDay()
        this.createCalendar(query);
        this.listMenu = this._menuData.getMenusByQuery(query);
    }

    createCalendar(query:query){
        if (this.menuObs){
            this.menuObs.unsubscribe()
        }
        this.menuObs = this._menuData.getMenusByQuery(query).subscribe((menus:Menu[])=> {
            if (menus.length< 7){
                //hay que añadir los dias que faltan con el menu vacio
                for (let day:Date = query.firstDay; day <= query.lastDay; day.setDate(day.getDate()+1)){
                    let menu = menus.filter((menu:any)=> menu.day.toDate().toString() == day.toString())
                    if (menu.length == 0){
                        
                        let menu = new Menu({day: day})
                        this._menuData.addMenu(menu);
                    }
                }
            }
        })
    }

    getPrevWeek(day:Date = new Date()):Date{
        day.setDate(day.getDate()-7);
        let query:query = this._menuData.getRangeDay(day);
        this.createCalendar(query);
        this.listMenu = this._menuData.getMenusByQuery(query);

        return day;
    }

    getNextWeek(day:Date = new Date()):Date{
        //console.log(day)
        day.setDate(day.getDate()+7);
        let query:query = this._menuData.getRangeDay(day);
        this.createCalendar(query);
        this.listMenu = this._menuData.getMenusByQuery(query);
        return day;
    }
}
