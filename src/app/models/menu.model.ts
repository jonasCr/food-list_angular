import { recipe } from "./recipe.model";

export interface menu {
    idMenu?:string;
    day:Date;
    weekday:any;
    lunch?:recipe;
    dinner?:recipe;
}