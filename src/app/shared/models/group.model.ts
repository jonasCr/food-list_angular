import { User } from "./user.model";


export interface ParamsGroup{
    idGroup?:string;
    name?:string;
    membersIDs?:string[];
}

export class Group implements ParamsGroup{
    idGroup?:string;
    name?:string;
    membersIDs?:string[];

    constructor(params:ParamsGroup){
        if (params.idGroup != undefined){
            this.idGroup = params.idGroup
        }
        if (params.name != undefined){
            this.name = params.name
        }
        if (params.membersIDs != undefined){
            this.membersIDs = params.membersIDs
            
        }
    }

    getData(){
        return Object.assign({}, this);
    }

}