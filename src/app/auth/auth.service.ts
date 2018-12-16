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
    userGroups:Group[]

    constructor(
        private afAuth:AngularFireAuth,
        private userData:UserData,
        private router:Router,
        private groupData:GroupData
    ){
        
    }

    setUserData(idUser:string){
        this.userData.getUser(idUser).subscribe(user => {
            this.user = new User(user);
            
        })
        this.groupData.getUserGroups(idUser).subscribe(groups => {
            this.userGroups = [];
            for (let i = 0; i < groups.length; i++) {
                const group = groups[i];
                this.userGroups.push(new Group(group));
            }
        })
    }

    

    loginWithEmail(email:string, password:string){
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            this.userData.getUser(user.user.uid).subscribe(user=>{
                this.user = new User(user);
                console.log(this.user);
                this.getUserGroup(this.user.userId)
            })
        })
        .catch(error => {
            console.log(error)
            throw error
        });
    }

    signOut(): void {
        this.afAuth.auth.signOut();
        this.router.navigate(['/']);
        localStorage.removeItem('user');
    }


    getUserGroup(idUser:string):Promise<any>{
        return new Promise(resolve => {
            this.groupData.getUserGroups(idUser).subscribe((data:Group[])=> {
                this.userGroups = [];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    this.userGroups.push(new Group(item))
                }
                resolve();
            })
        })
        
    }
}