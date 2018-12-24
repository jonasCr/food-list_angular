import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserData } from "src/app/data/user/user.data";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UserToken } from "src/app/shared/models/userToken.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector:'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    loginForm:FormGroup
    constructor(
        private afAuth:AngularFireAuth,
        private userData:UserData,
        private authService:AuthService,
        private router:Router,
        public translate: TranslateService
    ){
        if (localStorage.getItem('user') != undefined){
            localStorage.removeItem('user');
        }
        this.loginForm = new FormGroup({
            'email': new FormControl('',[
                Validators.email,
                Validators.required
            ]),
            'password': new FormControl('',[
                Validators.required,
                Validators.minLength(6)
            ]),

        })

    }

    login(){
        let values = this.loginForm.value
        this.afAuth.auth.signInWithEmailAndPassword(values.email, values.password)
        .then(user => {
            this.userData.getUser(user.user.uid).subscribe(user=>{
                this.authService.setUserData(user.userId).then(()=> {
                    let token = new UserToken(user.userId);
                    localStorage.setItem('user', JSON.stringify(token));
                    this.router.navigate(['/calendar'])
                })
            })
        })
        .catch(error => {
            console.log(error)
            throw error
        });
    }
}