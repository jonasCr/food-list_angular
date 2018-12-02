import { Component} from "@angular/core";
import {  Recipe, ParamsRecipe } from 'src/app/shared/models/recipe.model';
import { ImageData } from 'src/app/data/image.data';
import { IngredientData } from 'src/app/data/ingredient.data';
import {ActivatedRoute, Router} from '@angular/router'
import { RecipeData } from "src/app/data/recipe.data";
import { GlobalService } from "src/app/services/global.service";
import { MatDialog } from "@angular/material";
import { RecipeDialogCategory } from "./recipe-dialog-category";
import { Location } from "@angular/common";
import { Item } from "src/app/shared/models/item.model";
import {  Observable } from "rxjs";
import { Image, ParamsImage } from "src/app/shared/models/image.model";
import { NotificationService } from "src/app/services/notificacion.service";


@Component({
    selector:'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.scss']
})

export class RecipeEditComponent{
    idRecipe:string;
    recipe:Recipe;
    file:File;
    allIngredients:any[]= [];
    categoryList:string[] = [];
    itemToAdd:string;

    constructor(
        private _notif:NotificationService,
        private _imageData:ImageData,
        private _ingredientData:IngredientData,
        private _recipeData:RecipeData,
        private Activatedrouter:ActivatedRoute,
        private router:Router,
        public _globalService:GlobalService,
        public dialog: MatDialog,
        private location:Location

    ){
        this._globalService.progress= true;
        this.Activatedrouter.params.subscribe(params => {
            this.idRecipe = params['idRecipe'];
            if (this.idRecipe !== 'create'){
                this._recipeData.getRecipe(this.idRecipe).subscribe((data:any)=> {
                    this.recipe = new Recipe(data);
                    //console.log(data);
                    this._globalService.setTitle(this.recipe.name);
                })
            }else {
                let newImage = new Image({
                    url:"",
                    name: ""
                })
                //let paramsImage:ParamsImage = 
                let paramsRecipe:ParamsRecipe = {
                    name:"",
                    description:"",
                    image: newImage,
                    grade:1,
                }
                this.recipe = new Recipe(paramsRecipe);
            }
            
        })

        console.log(this.recipe)
        

        this._ingredientData.getIngredient().subscribe(data => {
            this.allIngredients = data;
            console.log(this.allIngredients);
            for(let i = 0; i<this.allIngredients.length; i++){
                if (!this.categoryList.includes(this.allIngredients[i].category)){
                    this.categoryList.push(this.allIngredients[i].category);
                }
            }
            this._globalService.progress= false

        })

    }

    saveChange(){
        this._globalService.progress = true;
        if(this.file){
            //upload photo
            this._imageData.uploadImage(this.file).then(data => {
                this.recipe.image = data;
                if (this.recipe.idRecipe){
                    this._recipeData.updateRecipe(this.recipe);
                    this._globalService.progress = false
                }else {
                    delete this.recipe.idRecipe
                    this._recipeData.addRecipe(this.recipe);
                    this._globalService.progress = false;
                    this.router.navigate(['/recipe'])
                }
                
            });

        }else {
            if (this.recipe.idRecipe){
                    this._recipeData.updateRecipe(this.recipe);
                    console.log(this.recipe);
                    this._globalService.progress = false
                }else {
                    delete this.recipe.idRecipe
                    this._recipeData.addRecipe(this.recipe);
                    this._globalService.progress = false;
                    this.router.navigate(['/recipe'])
                }
        }
        


        
        
    }

    cancel(){
        this.location.back();
    }

    onChangeFile(file){
        this._globalService.progress= true
        let reader = new FileReader();
        reader.onload = (e:any) => {
            let params:ParamsImage =  {
                name: file.target.files[0].name,
                url: e.target.result
            }
            this.recipe.image = new Image(params);
        }
        reader.readAsDataURL(file.target.files[0]);
        this.file = file.target.files[0];
        this._globalService.progress= false
    }

    
    chooseCategory(ingredient:string):Observable<string>{
        console.log(ingredient);
        const dialogRef = this.dialog.open(RecipeDialogCategory, {
            width: '250px',
            data: {ingredient: ingredient, categories: this.categoryList}
        });

        return dialogRef.afterClosed()
        

    }
    pressEnter(){
        
        let category:string;

        this.chooseCategory(this.itemToAdd).subscribe(category=> {
            if (category){
                let ingredient:Item = new Item({
                    name: this.itemToAdd,
                    category: category
                })
                this._globalService.progress= true
                this._ingredientData.addIngredient(ingredient).then(newIngredient => {
                    this.recipe.ingredientsList.push(ingredient);
                    this._globalService.progress= false;
                    this._notif.showMessage('Se ha añadido correctamente el ingrediente')
                    this.itemToAdd = '';
                })
            }
        })
    

        console.log(this.recipe);

    }
    deleteIngredient(i){
        this.recipe.ingredientsList.splice(i,1)
    }

    selected(event, item){
        if (event.source.selected){
            if(!this.recipe.ingredientsList){
                this.recipe.ingredientsList = [];
            }
            this.recipe.ingredientsList.push(new Item(item))
        }
        this.itemToAdd = '';
    }
    
}