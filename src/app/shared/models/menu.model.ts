import { Recipe, ParamsRecipe } from "./recipe.model";
import { Timestamp } from "@firebase/firestore-types";
export interface ParamsMenu {
    idMenu?:string;
    weekday?:any;
    day?:Date;
    meals?:Recipe[];  
}

export class Menu implements ParamsMenu {
    idMenu?:string;
    weekday:any;
    day:Date;
    meals:Recipe[] = [];

    constructor(params?:ParamsMenu){
        if(params.day != undefined){
            this.day = params.day;
            this.weekday = this.day.getDay();
        }
        if(params.idMenu != undefined){
            this.idMenu = params.idMenu;
        }
        if(params.meals != undefined){
            if (params.idMenu = 'KCIPv6Ka8H9jo2P5DWry'){
            }
            this.meals = [];
            for (let i = 0; i<params.meals.length; i++){
                this.meals.push(new Recipe(params.meals[i]))
            }
            let i = this.meals.length +1
            while (this.meals.length < 2){
                let p:ParamsRecipe = {
                    idMeal: i
                }
                this.meals.push(new Recipe(p));
                i++
            }
        }

        if(this.meals.length == 0){
            let i = this.meals.length +1
            while (this.meals.length < 2){
                let params:ParamsRecipe = {
                    idMeal: i
                }
                this.meals.push(new Recipe(params));
                i++
            }
        }
        
    }

    getData(){
        let response = Object.assign({},this);
        if(response.meals != undefined){
            for (let i = 0; i<response.meals.length;i++){
                response.meals[i] = response.meals[i].getData();
                if(response.meals[i].image != undefined){
                    response.meals[i].image = response.meals[i].image.getData();
                }
            }
        }
        
        return response;
    }
}