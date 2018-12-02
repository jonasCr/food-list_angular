import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/app/shared/models/recipe.model";
import { RecipeData } from "src/app/data/recipe.data";

@Component({
    selector:'app-recipe-details',
    templateUrl:'./recipe-details.component.html',
    styleUrls:['./recipe-details.component.scss']
})

export class RecipeDetails {
    @Input() recipe:Recipe;
    @Input() parent:string;
    @Output() deleteBtn:EventEmitter<boolean> = new EventEmitter;
    constructor(
            public _recipeData:RecipeData,
        ){}



    deleteRecipeFromMenu(){
        this.deleteBtn.emit(true);
    }

    onChange(event){
        this._recipeData.updateRecipe(this.recipe);
    }

    updateGrade(grade:number){
        this.recipe.grade = grade;
        this._recipeData.updateRecipe(this.recipe);
    }

    isStar(i){
        return i<= this.recipe.grade;
    }

   
}