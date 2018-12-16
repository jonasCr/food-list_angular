import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/auth/auth.service";
import { GroupData } from "src/app/data/group.data";
import { User } from "src/app/shared/models/user.model";
import { Group } from "src/app/shared/models/group.model";

@Component({
    selector:'app-user',
    templateUrl: './user.component.html'
})

export class UserComponent {
    user:User;
    userGroups:Group[]
    constructor(
        public afAuth:AngularFireAuth,
        public authService:AuthService,
        private groupData:GroupData,
        ){
            //this.login();

    }

    

    login(){
        let email = 'jonas.cruchon@gmail.com';
        let password = '123456';
        //let displayName = 'jonas';
        this.authService.loginWithEmail(email,password).then(data => {
            this.user = this.authService.user;
            this.userGroups = this.authService.userGroups;
            console.log(this.userGroups);
            console.log(this.user);
        })
    }

    getgroupofuser(userId:string){
        this.groupData.getUserGroups(userId).subscribe((data)=> {
            console.log(data);
        })
    }
}