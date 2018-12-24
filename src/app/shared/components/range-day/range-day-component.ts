import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { query } from "src/app/shared/models/query.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector:'app-range-day',
    templateUrl:'./range-day.component.html',
})


export class RangeDayComponent implements OnInit{

    @Output() query:EventEmitter<query> = new EventEmitter();
    value:query;
    firstDayValue:Date = new Date();
    lastDayValue:Date = new Date();

    constructor(
        public translate:TranslateService
    ){
        //por defecto se añade la semana actual
        let day = new Date();
        let dateString:string = day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate();
        this.value  = new query({
            firstDay: new Date(),
            lastDay: new Date()
        })

        day.setHours(0,0,0,0);
        let weekDay:number = day.getDay() != 0 ? day.getDay(): 7;
        
        //Se determina el primer dia de la semana restando el numero del dia al dia de hoy
        this.value.firstDay.setHours(0,0,0,0);
        this.value.firstDay.setDate(day.getDate() - weekDay+1)

        //Se determina el ultimo dia de la semana
        this.value.lastDay.setHours(0,0,0,0);
        this.value.lastDay.setDate(day.getDate() + (7-weekDay))
    }

    ngOnInit(){
        this.query.emit(this.value);
    }

    onValueChange(){
        this.query.emit(this.value);

    }
}