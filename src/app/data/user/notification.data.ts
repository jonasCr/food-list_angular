import { Injectable } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Notification, NotificationParams } from "src/app/shared/models/notification.model";


@Injectable({
    providedIn: 'root',
})

export class NotificationData {
    collection:AngularFirestoreCollection<Notification> = this._afs.collection('notifications');
    constructor(private _afs:AngularFirestore){
        let params:NotificationParams =  {
            toIdUser: 'EB8dAygdmqRkNfuE8CGYzn01F1C2',
            fromIdUser: 'EB8dAygdmqRkNfuE8C2',
            content: 'U got a message',
            type: 1,
            read: false
        }

        //this.addNotification(new Notification(params))

        let params2:NotificationParams =  {
            toIdUser: 'EB8dAygdmqRkNfuE8CGYzn01F1C2',
            fromIdUser: 'EB8dAygdmqRkNfuE8C2',
            content: 'U dont have a message',
            type: 3,
            read: true
        }

        //this.addNotification(new Notification(params2))
    }

    //To create a new group of person
    addNotification(notif:Notification){
        return this.collection.add(notif.getData());
    }

    //to create the by default group of an user
    upDateGroup(group){
        let groupId = group.groupId;
        delete group.groupId
        this.collection.doc(groupId).set(group.getData());
    }



    

    getUserNotifications(userId:string){
        debugger;
        return this._afs.collection('notifications', ref => ref.where('toIdUser', '==', userId))
            .snapshotChanges().pipe(
                map(notifiaction => notifiaction.map(a => {
                    const data:any = a.payload.doc.data();
                    const idNotification = a.payload.doc.id;
                    return {idNotification,...data};
                }))
            );
    }
}
