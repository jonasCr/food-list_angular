import { Component, Inject } from "@angular/core";
import {MatDialogRef,MAT_DIALOG_DATA, MatDialog} from '@angular/material';


@Component({
    selector:'app-recipe-dailog-category',
    template: `
        <h1 mat-dialog-title>{{data.ingredient}}</h1>
        <div mat-dialog-content>
          <p>Elige una categoria para ese ingredient</p>
          <mat-form-field>
            <input cdkFocusInitial [matAutocomplete]="categoryAuto" matInput [(ngModel)]="category">
            <mat-autocomplete #categoryAuto="matAutocomplete">
              <mat-option *ngFor="let category of data.categories" [value]="category">
                <span>{{category}}</span>
              </mat-option>
            </mat-autocomplete>
          </mat-form-field>
        </div>
        <div mat-dialog-actions>
          <button mat-button (click)="onNoClick()">Cancelar</button>
          <button mat-button (click)="sendCategory()">Ok</button>
        </div>
    `
})

export class RecipeDialogCategory {
    category:string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data:{ingredient:string, categories:string[]},
        public dialogref:MatDialogRef<RecipeDialogCategory>
    ){
        console.log(data.ingredient);
    }

    onNoClick(){
        this.dialogref.close();
    }
    sendCategory(){
        this.dialogref.close(this.category);
    }
}



