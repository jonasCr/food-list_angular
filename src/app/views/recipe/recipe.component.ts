import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";
import { Recipe } from "src/app/shared/models/recipe.model";
import { RecipeData } from "src/app/data/recipe.data";

@Component({
    selector:'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss']
})

export class RecipeComponent implements OnInit{
    recipes:Recipe[] = [];
    constructor(
        public _globalService:GlobalService,
        private _recipeData:RecipeData
    ){
        this._globalService.setTitle('Recipe');
        this._globalService.progress = true
        
        this._recipeData.getRecipes().subscribe((data:any[])=> {
            this.recipes= data;
            console.log(this.recipes);
            this._globalService.progress = false;
            console.log(this._globalService.progress)
        })
        
    }


    ngOnInit(){}

    addMenu(recipe:Recipe){
        this._recipeData.addRecipe(recipe);
    }
}