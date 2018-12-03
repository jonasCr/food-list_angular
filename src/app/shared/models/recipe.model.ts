import { Item } from "./item.model";
import { Image } from "./image.model";
import { iif } from "rxjs";

export interface ParamsRecipe{
    idRecipe?:string;
    idMeal?:number; // 0=desayuno; 1=comida; 2=cena
    name?:string;
    description?:string;
    image?:Image;
    ingredientsList?:Item[];
    grade?:number; 
}

export class Recipe implements ParamsRecipe {
    idRecipe?:string;
    idMeal?:number; // 0=desayuno; 1=comida; 2=cena
    name:string;
    description:string;
    image?:Image;
    ingredientsList?:Item[];
    grade?:number; 

    // constructor(idMeal?:number, name?:string){
    constructor(params?:ParamsRecipe){
        if (params.name != undefined){
            this.name = params.name
        }
        if (params.description != undefined){
            this.description = params.description
        }
        if (params.idMeal != undefined){
            this.idMeal = params.idMeal
        }
        if (params.grade != undefined){
            this.grade = params.grade
        }
        if (params.image != undefined){
            this.image = new Image(params.image);
        }
        if (params.ingredientsList != undefined){
            this.ingredientsList = [];
            for (let ingredient of params.ingredientsList){
                this.ingredientsList.push(new Item(ingredient));
            }
        }
        if (params.idRecipe != undefined){
            this.idRecipe = params.idRecipe
        }        

    }

    getData(){
        let response = Object.assign({}, this);
        if(response.ingredientsList){
            for (let i in response.ingredientsList){
                response.ingredientsList[i] = response.ingredientsList[i].getData();
            }
        }
        response.image = response.image.getData();
        
        return response;
    }
        
}