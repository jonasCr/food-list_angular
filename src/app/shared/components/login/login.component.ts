import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector:'app-login',
    templateUrl: './login.component.html'
})

export class UserComponent {
    constructor(
        public afAuth:AngularFireAuth,
        public authService:AuthService
        ){
            this.login();

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
}