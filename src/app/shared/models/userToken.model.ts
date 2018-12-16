export class UserToken {
    userID:string;
    expire:Date = new Date()
    constructor(userId:string){
        this.userID = userId;
        this.expire.setDate(this.expire.getDate()+7);
        console.log(this.expire);
    }
}