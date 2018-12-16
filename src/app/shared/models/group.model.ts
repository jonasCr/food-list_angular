import { User } from "./user.model";


export interface ParamsGroup{
    groupId?:string;
    name?:string;
    membersIDs?:string[];
}

export class Group implements ParamsGroup{
    groupId?:string;
    name?:string;
    membersIDs?:string[];

    constructor(params:ParamsGroup){
        console.log(params);
        if (params.groupId != undefined){
            this.groupId = params.groupId
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