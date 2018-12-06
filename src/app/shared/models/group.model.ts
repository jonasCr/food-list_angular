import { User } from "./user.model";

export interface ParamsGroup{
    groupId?:string;
    name?:string;
    members?:User[];
}

export class Group implements ParamsGroup{
    groupId?:string;
    name?:string;
    members?:User[];

    constructor(params:ParamsGroup){
        if (params.groupId != undefined){
            this.groupId = params.groupId
        }
        if (params.name != undefined){
            this.name = params.name
        }
        if (params.members != undefined){
            this.members = [];
            for (let i = 0; i < params.members.length; i++){
                delete params.members[i].groupsIds;
                this.members.push(new User(params.members[i])); 
            }
            
        }
    }

    getData(){
        let response = Object.assign({}, this);
        if (response.members != undefined){
            for (let i = 0; i<response.members.length; i++){
                response.members[i] = response.members[i].getData();
            }
        }

        return response;
    }

}