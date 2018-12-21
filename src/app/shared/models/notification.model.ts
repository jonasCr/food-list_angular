export interface NotificationParams {
    idNotification?:string;
    fromIdUser?:string;
    toIdUser?:string;
    content?:string;
    read?:boolean;
    type?:number;
    date?:Date;
}

export class Notification implements NotificationParams{
    idNotification?:string;
    fromIdUser?:string;
    toIdUser?:string;
    content?:string;
    read?:boolean;
    type?:number;
    date?:Date;

    constructor(params:NotificationParams){
        if(params.idNotification != undefined){
            this.idNotification = params.idNotification
        }
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
        if(params.date != undefined){
            this.date = params.date
        }
    }

    getData(){
        return Object.assign({},this);
    }
}