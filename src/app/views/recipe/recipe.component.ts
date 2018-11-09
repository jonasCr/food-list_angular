import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";

@Component({
    selector:'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss']
})

export class RecipeComponent implements OnInit{
    constructor(private _globalService:GlobalService){
        this._globalService.setTitle('Recipe')
    }

    ngOnInit(){}
}