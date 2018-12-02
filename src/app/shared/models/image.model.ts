export interface ParamsImage{
    name?:string;
    url?:string;
    idImage?:string;
}

export class Image {
    name:string;
    url:string;
    idImage?:string;

    constructor(params?:ParamsImage){
        if (params.idImage != undefined){
            this.idImage = params.idImage
        }

        if (params.url != undefined){
            this.url = params.url
        }
        if (params.name != undefined){
            this.name = params.name
        }
        
    }
    getData(){
        return Object.assign({}, this);  
    }
}