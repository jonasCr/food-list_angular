import { ingredient } from "./ingredient.model";

export interface recipe {
    idRecipe?:string;
    name:string;
    description:string;
    urlPhoto:string;
    ingredientsList:ingredient[];
    grade?:number
}