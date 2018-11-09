import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";

@Component({
    selector:'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit{
    days:any[];
    today:number= new Date().getDay();

    constructor(private _globalService:GlobalService){
        this._globalService.setTitle('Calendar');
        this.days = [
            { day: 1, literal: 'Lunes', name: 'huevos fritos'},
            { day: 2, literal: 'Martes', name: 'huevos fritos'},
            { day: 3, literal: 'Miercoles', name: 'huevos fritos'},
            { day: 4, literal: 'Jueves', name: 'huevos fritos'},
            { day: 5, literal: 'Viernes', name: 'huevos fritos'},
            { day: 6, literal: 'Sabado', name: 'huevos fritos'},
            { day: 7, literal: 'Domingo', name: 'huevos fritos'}
        ];

        //console.log(this.today.getDay())


    }

    ngOnInit(){}
}