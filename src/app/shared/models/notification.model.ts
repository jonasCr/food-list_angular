export interface NotificationParams {
    fromIdUser?:string;
    toIdUser?:string;
    content?:string;
    read?:boolean;
    type:number;
}

export class Notification implements NotificationParams{
    fromIdUser?:string;
    toIdUser?:string;
    content?:string;
    read?:boolean;
    type:number;

    constructor(params:NotificationParams){
        if(params.fromIdUser != undefined){
            this.fromIdUser = params.fromIdUser
        }

        if(params.toIdUser != undefined){
            this.toIdUser = params.toIdUser
        }

        if(params.content != undefined){
            this.content = params.content
        }

        if(params.read != undefined){
            this.read = params.read
        }

        if(params.type != undefined){
            this.type = params.type
        }
    }

    getData(){
        return Object.assign({},this);
    }
}