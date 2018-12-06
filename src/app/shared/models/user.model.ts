import { Image } from "./image.model";

export interface ParamsUser {
    userId?:string;
    displayName?:string;
    email?:string;
    groupsIds?:string[];
    photo?:Image;
}

export class User implements ParamsUser {
    userId?:string;
    displayName?:string;
    email?:string;
    groupsIds?:string[];
    photo?:Image;
    constructor(params:ParamsUser){
        if(params.userId != undefined){
            this.userId = params.userId
        }
        if(params.displayName != undefined){
            this.displayName = params.displayName
        }

        if(params.email != undefined){
            this.email = params.email
        }

        if(params.groupsIds != undefined){
            this.groupsIds = params.groupsIds
        }
        
        if(params.photo != undefined){
            this.photo = new Image(params.photo)
        }


    }

    getData(){
        let response = Object.assign({}, this);
        if (response.photo != undefined){
            response.photo = response.photo.getData();
        }

        return response;
    }
}