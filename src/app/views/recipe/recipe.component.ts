import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { recipe } from "src/app/models/recipe.model";
import { DataService } from "src/app/services/data.service";
import { menu } from "src/app/models/menu.model";

@Component({
    selector:'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss']
})

export class RecipeComponent implements OnInit{
    recipe:recipe[];
    constructor(
        private _globalService:GlobalService,
        private _dataService:DataService,
        private _db:AngularFirestore    
    ){
        this._globalService.setTitle('Recipe');
        
        this._dataService.getRecipes().subscribe((data:any[])=> {
            this.recipe = data;
            console.log(this.recipe);
        })

        //this.addMenu();
        
    }


    ngOnInit(){}

    addMenu(recipe:recipe){
        
        this._dataService.addRecipe(recipe);
    }
}