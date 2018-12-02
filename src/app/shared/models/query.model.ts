export interface paramsQuery{
    firstDay:Date;
    lastDay:Date;
}

export class query implements paramsQuery {
    firstDay:Date;
    lastDay:Date;

    constructor(params:paramsQuery){
        if (params.firstDay != undefined){
            this.firstDay = params.firstDay;
        }

        if (params.lastDay != undefined){
            this.lastDay = params.lastDay;
        }
    }

    getData(){
        return Object.assign({}, this);
    }
}