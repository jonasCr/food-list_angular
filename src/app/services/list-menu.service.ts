import { menu } from "../models/menu.model";
import { DataService } from "./data.service";
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { query } from "../models/query.model";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})


export class MenuListService{
    listMenu:Observable<menu[]>;

    constructor(
            public dataService:DataService,
            public _db:AngularFirestore
        ){
        let query:query = this.getRangeDay()
        this.createCalendar(query);
        this.listMenu = this.dataService.getMenus(query);
    }

    getRangeDay(day:Date = new Date()):query{
        let response:query = {
            firstDay: new Date(),
            lastDay: new Date()
        }

        day.setHours(0,0,0,0);
        let weekDay:number = day.getDay() != 0 ? day.getDay(): 7;
        
        //Se determina el primer dia de la semana restando el numero del dia al dia de hoy
        response.firstDay.setHours(0,0,0,0);
        response.firstDay.setDate(day.getDate() - weekDay+1)
        //console.log(firstDay)

        //Se determina el ultimo dia de la semana
        response.lastDay.setHours(0,0,0,0);
        response.lastDay.setDate(day.getDate() + (7-weekDay))
        //console.log(lastDay);

        return response;
    }

    createCalendar(query:query){
        this.dataService.getMenus(query).subscribe((menus:menu[])=> {
            //console.log(menus);
            if (menus.length< 7){
                //hay que añadir los dias que faltan con el menu vacio
                for (let day:Date = query.firstDay; day <= query.lastDay; day.setDate(day.getDate()+1)){
                    let menu = menus.filter((menu:any)=> menu.day.toDate().toString() == day.toString())
                    if (menu.length == 0){
                        let menu:menu = {
                            day: day,
                            weekday: day.getDay(),
                        }
                        this.dataService.addMenu(menu);

                    }
                    
                }
            }
        })

    }

    getPrevWeek(day:Date = new Date()){
        day.setDate(day.getDate()-7);
        let query:query = this.getRangeDay(day);
        this.createCalendar(query);
    }

    getNextWeek(day:Date = new Date()){
        day.setDate(day.getDate()+7);
        let query:query = this.getRangeDay(day);
        this.createCalendar(query);
    }
}
