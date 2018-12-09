import { Injectable } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { Group } from "../shared/models/group.model";
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})

export class GroupData {
    collection:AngularFirestoreCollection<Group> = this._afs.collection('groups');
    constructor(private _afs:AngularFirestore){}

    //To create a new group of person
    createGroup(group:Group){
        this.collection.add(group.getData());
    }

    //to create the by default group of an user
    setGroup(group:Group){
        let groupId = group.groupId;
        delete group.groupId
        this.collection.doc(groupId).set(group.getData());
    }

    getGroupOfUser(userId:string){
        //debugger;
        return this._afs.collection('groups', ref => ref.where('membersIDs', 'array-contains', userId))
            .snapshotChanges().pipe(
                map(group => group.map(a => {
                    const data:any = a.payload.doc.data();
                    const idGroup = a.payload.doc.id;
                    return {idGroup,...data};
                }))
            );
    }
}
