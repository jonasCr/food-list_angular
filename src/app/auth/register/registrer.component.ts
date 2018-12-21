import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { Image } from "src/app/shared/models/image.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { User, ParamsUser } from "src/app/shared/models/user.model";
import { UserToken } from "src/app/shared/models/userToken.model";
import { UserData } from "src/app/data/user/user.data";
import { GroupData } from "src/app/data/user/group.data";
import { ParamsGroup, Group } from "src/app/shared/models/group.model";
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { Router } from "@angular/router";


@Component({
    selector: 'app-registrer',
    templateUrl: './registrer.component.html'
})

export class RegistrerComponent {
    registerForm:FormGroup
    email:string = 'jonas.cruchon@gmail.com';
    password:string = '123456';
    displayName:string = 'Jonas';
    photo:Image;
    constructor(
        private authService:AuthService,
        private afAuth:AngularFireAuth,
        private userData:UserData,
        private groupData:GroupData,
        private router:Router
    ){
        this.registerForm = new FormGroup({
            'email': new FormControl('',[
                Validators.email,
                Validators.required
            ]),
            'displayName': new FormControl('',[
                Validators.required,
                Validators.minLength(3),
            ]),
            'password': new FormControl('',[
                Validators.required,
                Validators.minLength(6)
            ]),
            'passwordConfirm': new FormControl(),

        })

        this.registerForm.controls['passwordConfirm'].setValidators([
            Validators.required,
            this.confirmPassword.bind(this.registerForm)
        ])
        console.log(this.registerForm);
    }

    test(){
        console.log(this.registerForm);
        //console.log()
    }

    signUp(){
        let values =  this.registerForm.value;
        console.log(values);
        this.afAuth.auth.createUserWithEmailAndPassword(values.email,values.password)
        .then((user)=> {
            //debugger;
            let paramsUser:ParamsUser = {
                userId: user.user.uid,
                displayName: values.displayName,
                email: values.email,
            }
            let newUser = new User(paramsUser);
            //let user = new User(paramsUser)
            this.userData.setUser(newUser).then(()=> {
                this.createDefaultGroup(newUser).then(()=> {
                    this.authService.setUserData(user.user.uid)
                });
            });
            
            let token = JSON.stringify(new UserToken(user.user.uid));
            localStorage.setItem('user',token);
            this.router.navigate(['/calendar'])
        }).catch(error => {
            console.log(error)
            throw error;
        })
    }
    signOut(){
        //debugger;
        this.afAuth.auth.signOut().then(()=> console.log('logout'));
    }

    confirmPassword(control:FormControl):{[s:string]:boolean}{
        //console.log(this);
        let form:any = this
        if (control.value !== form.controls['password'].value){
            return {
                confirmPassword:true
            }
        }

        return null;
    }

    createDefaultGroup(user:User):Promise<any>{
        return new Promise(resolve => {
            let params:ParamsGroup = {
                idGroup: user.userId,
                name: user.displayName,
                membersIDs: [user.userId]
            }
            this.groupData.createGroup(new Group(params)).then(()=> {
                resolve();
            });
        })
        
    }
}