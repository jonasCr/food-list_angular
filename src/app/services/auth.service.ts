import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User, ParamsUser } from '../shared/models/user.model';
import { UserData } from '../data/user.data';
import { GroupData } from '../data/group.data';
import { ParamsGroup, Group } from '../shared/models/group.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    user:User = null

    constructor(
        private afAuth:AngularFireAuth,
        private userData:UserData,
        private router:Router,
        private groupData:GroupData
    ){}

    signUpWithEmail(email, password, displayName:string){
        this.afAuth.auth.createUserWithEmailAndPassword(email,password)
        .then((user) => {
            let paramsUser:ParamsUser = {
                userId: user.user.uid,
                displayName: displayName,
                email: email,
                //By default, we create a group with the id of the user
                groupsIds:[user.user.uid]
            }
            this.user = new User(paramsUser);
            console.log(this.user);
            this.userData.setUser(this.user).then(()=> {
                this.createGroup(new User(paramsUser))
            });
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

    createGroup(user:User){

        let userList = []
        userList.push(user);
        let params:ParamsGroup = {
            groupId: user.userId,
            name: user.displayName,
            members: userList
        }
        
        this.groupData.setGroup(new Group(params));
    }
    

    
}