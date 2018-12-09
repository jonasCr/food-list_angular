import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/auth/auth.service";
import { GroupData } from "src/app/data/group.data";

@Component({
    selector:'app-login',
    templateUrl: './user.component.html'
})

export class UserComponent {
    constructor(
        public afAuth:AngularFireAuth,
        public authService:AuthService,
        private groupData:GroupData,
        ){
            this.getgroupofuser('Fn1YiLSlbtNy0Y6S6o9KGUysdRj1');

    }

    signUp(){
        let email = 'jonas.cruchon@gmail.com';
        let password = '123456';
        let displayName = 'Jonas';
        this.authService.signUpWithEmail(email,password, displayName)
    }

    login(){
        let email = 'jonas.cruchon@gmail.com';
        let password = '123456';
        //let displayName = 'jonas';
        this.authService.loginWithEmail(email,password).then(data => {
            // console.log(data);
            // console.log(this.authService.authState.uid)
        })
    }

    getgroupofuser(userId:string){
        this.groupData.getGroupOfUser(userId).subscribe((data)=> {
            console.log(data);
        })
    }
}