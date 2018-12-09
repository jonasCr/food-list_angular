import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/app/shared/models/recipe.model";
import { RecipeData } from "src/app/data/recipe.data";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotificationService } from "src/app/services/notificacion.service";
import { ConfirmComponent } from "../confirm-dialog/confirm-dialog.component";


@Component({
    selector:'app-recipe-details',
    templateUrl:'./recipe-details.component.html',
    styleUrls:['./recipe-details.component.scss']
})

export class RecipeDetailsComponent {
    @Input() recipe:Recipe;
    @Input() parent:string;
    @Output() deleteBtn:EventEmitter<boolean> = new EventEmitter;
    @Output() checkList:EventEmitter<Recipe> = new EventEmitter;
    constructor(
            public _recipeData:RecipeData,
            public dialog: MatDialog,
            private _notif:NotificationService,
        ){}

    onChange(){
        this.checkList.emit(this.recipe);
    }

    updateGrade(grade:number){
        this.recipe.grade = grade;
        this._recipeData.updateRecipe(this.recipe);
    }

    isStar(i){
        return i<= this.recipe.grade;
    }

    confirm(){
        if (this.parent == 'recipe'){
            const dialogRef = this.dialog.open(ConfirmComponent, {
                width: '250px',
                data: `borrar la receta ${this.recipe.name}`
            });
    
            dialogRef.afterClosed().subscribe(data => {
                if (data){
                    this._recipeData.deleteRecipe(this.recipe).then(()=> {
                        this._notif.showMessage('Receta suprimida...');
                        //this.router.navigate(['/recipe'])
                    })
                }
            })
        }else {
            this.deleteBtn.emit(true);
        }
        
    }

   
}