import { Injectable } from '@angular/core';
import { LoginCredential } from '../shared/models/loginCredentials.model';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User, ParamsUser } from '../shared/models/user.model';
import { UserData } from '../data/user.data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    user:User = null

    constructor(
        private afAuth:AngularFireAuth,
        private userData:UserData,
        private router:Router
    ){}

    signUpWithEmail(email, password, displayName:string){
        this.afAuth.auth.createUserWithEmailAndPassword(email,password)
        .then((user) => {
            let params:ParamsUser = {
                userId: user.user.uid,
                displayName: displayName,
                email: email
            }
            this.user = new User(params);
            console.log(this.user);
            this.userData.setUser(this.user);
            //return
        })
        .catch(error => {
            console.log(error)
            throw error
        })
    }

    loginWithEmail(email:string, password:string){
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            this.userData.getUser(user.user.uid).subscribe(user=>{
                this.user = new User(user);
                console.log(this.user);
            })
        })
        .catch(error => {
            console.log(error)
            throw error
        });
    }

    signOut(): void {
        this.afAuth.auth.signOut();
        this.router.navigate(['/'])
      }
}