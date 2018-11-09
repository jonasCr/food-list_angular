import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";

@Component({
    selector:'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit{
    constructor(private _globalService:GlobalService){
        this._globalService.setTitle('Calendar')
    }

    ngOnInit(){}
}