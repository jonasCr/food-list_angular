import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User, ParamsUser } from '../shared/models/user.model';
import { UserData } from '../data/user/user.data';
import { GroupData } from '../data/user/group.data';
import { Group } from '../shared/models/group.model';
import { Notification, NotificationParams } from '../shared/models/notification.model';
import { NotificationData } from '../data/user/notification.data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    user:User = null
    userGroups:Group[];
    notifications:Notification[];
    unreadNotification:number = 0;
    constructor(
        private afAuth:AngularFireAuth,
        private userData:UserData,
        private router:Router,
        private groupData:GroupData,
        private notificationData:NotificationData
    ){

        // let userParams:ParamsUser = {
        //     displayName: 'test',
        //     email: 'test.ch',
        //     userId: '12345678jd',
        // }
        // let notifParams:NotificationParams =  {
        //     fromIdUser: '212344324',
        //     toIdUser: '12535453',
        //     content: 'lorem éasdjféa sdlfnlasnflashnfd asldhfalsdnflasf alsdfalsdfn alsdfhafslnlaksdbf asdlfbasdlfb',
        //     date: new Date(),
        //     read: false,
        //     type: 1
        // }
        // this.unreadedNotification = [];
        // this.unreadedNotification.push(new Notification(notifParams))
        // this.user = new User(userParams);

        
    }

    setUserData(idUser:string):Promise<void>{
        return new Promise(resolve => {
            this.userData.getUser(idUser).subscribe(user => {
                this.user = new User(user);
                this.groupData.getUserGroups(idUser).subscribe(groups => {
                    this.userGroups = [];
                    for (let i = 0; i < groups.length; i++) {
                        const group = groups[i];
                        this.userGroups.push(new Group(group));
                    }
                    this.setNotification(idUser)
                })
            })
            resolve()
        })
        
    }

    setNotification(idUser:string){
        this.notificationData.getUserNotifications(idUser).subscribe((notifications:Notification[])=> {
            this.notifications = [];
            for (let i = 0; i < notifications.length; i++){
                const notification = notifications[i];
                this.notifications.push(new Notification(notification))
                if (!notification.read){
                    this.unreadNotification++;
                }
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
        this.afAuth.auth.signOut().then(()=> {
            this.user = null;
            this.userGroups = null;
            this.notifications = null;
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
        });
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