import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";

@Component({
    selector:'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit{
    constructor(private _globalService:GlobalService){
        this._globalService.setTitle('Food List')
    }

    ngOnInit(){}
}