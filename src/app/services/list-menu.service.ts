import { Menu } from "./../shared/models/menu.model";
import { Observable, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { query } from "./../shared/models/query.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { MenuData } from "./../data/menu.data";

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
        let query:query = this.getRangeDay()
        this.createCalendar(query);
        this.listMenu = this._menuData.getMenusByQuery(query);
    }

    getRangeDay(day:Date = new Date()):query{
        let dateString:string = day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate();
        
        let response:query = new query({
            firstDay: new Date(dateString),
            lastDay: new Date(dateString)
        })

        day.setHours(0,0,0,0);
        let weekDay:number = day.getDay() != 0 ? day.getDay(): 7;
        
        //Se determina el primer dia de la semana restando el numero del dia al dia de hoy
        response.firstDay.setHours(0,0,0,0);
        response.firstDay.setDate(day.getDate() - weekDay+1)

        //Se determina el ultimo dia de la semana
        response.lastDay.setHours(0,0,0,0);
        response.lastDay.setDate(day.getDate() + (7-weekDay))
        return response;
    }


    createCalendar(query:query):Promise<any>{
        return new Promise(resolve => {
            //debugger;
            let day = new Date(query.firstDay);
            if (this.menuObs){
                this.menuObs.unsubscribe()
            }
            this.menuObs = this._menuData.getMenusByQuery(query).subscribe((menus:Menu[])=> {
                    //Se añade para evitar que se inserta demasiado dias
                    let maxInsert = 50
                    let i = 0
                    //hay que añadir los dias que faltan con el menu vacio
                    for (day; day <= query.lastDay; day.setDate(day.getDate()+1)){
                        let menu = menus.filter((menu:any)=> menu.day.toString() == day.toString())
                        if (menu.length == 0){
                            //debugger;
                            let menu = new Menu({day: day})
                            this._menuData.addMenu(menu);
                        }
                        i++;
                        if (i === maxInsert){
                            break;
                        }
                    }
            })
            resolve();
        })
        
    }
}
