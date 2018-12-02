import { Recipe } from "./recipe.model";
import { Item } from "./item.model";
import { Menu } from "./menu.model";

export interface paramsMenuWeek {
    dateStart?:Date;
    dateEnd?:Date;
    days?:Menu[];
    list?:Item[];
}
/**
 * Se puede pasar una fecha base y se calculara el rango LUNES-DOMINGO
 * O bien la fecha de incio y de fin del rango que queremos
 * **/
export class MenuWeek implements paramsMenuWeek{
    dateStart:Date;
    dateEnd:Date;
    days:Menu[];
    list?:Item[]= [];

    constructor(params?:paramsMenuWeek){
        
        if(params.days){
            this.days = params.days;
        }
        if(params.list){
            for (let item of params.list){
                this.list.push(new Item(item));
            }
            //this.list = params.list
        }
    }
}

