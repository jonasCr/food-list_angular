export interface ParamsItem {
    idIngredient?:string;
    name?:string;
    category?:string;
    terminate?:boolean;
    weekday?:number;
}

export class Item {
    idIngredient?:string;
    name:string;
    category:string;
    terminate?:boolean;

    constructor(params?:ParamsItem){
        if (params.idIngredient != undefined){
            this.idIngredient = params.idIngredient
        }
        if (params.name != undefined){
            this.name = params.name
        }
        if (params.category != undefined){
            this.category = params.category
        }

        if(params.terminate != undefined){
            this.terminate = params.terminate
        }else {
            this.terminate = false
        }
        
        if (params.idIngredient != undefined){
            this.idIngredient = params.idIngredient
        }
    }

    getData(){
        return Object.assign({}, this);
    }
}