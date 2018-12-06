export interface LoginCredentialParams{
    email?:string;
    password?:string;
}
export class LoginCredential implements LoginCredentialParams{
    email:string;
    password:string;

    constructor(params:LoginCredentialParams){
        if(params.email != undefined){
            this.email = params.email
        }

        if(params.password != undefined){
            this.password = params.password
        }

        
    }
    
    getData():LoginCredential{
        return Object.assign({}, this);
    }
}