import { Injectable } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { Group } from "../../shared/models/group.model";
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})

export class GroupData {
    collection:AngularFirestoreCollection<Group> = this._afs.collection('groups');
    constructor(private _afs:AngularFirestore){}

    //To create a new group of person
    createGroup(group:Group){
        return this.collection.add(group.getData());
    }

    getGroup(idGroup:string){
        return this.collection.doc(idGroup).snapshotChanges().pipe(
            map(group =>  {
                const data = group.payload.data();
                const idGroup = group.payload.id;
                return new Group({idGroup, ...data})
            })
        );
    }

    //to create the by default group of an user
    upDateGroup(group:Group){
        let idGroup = group.idGroup;
        delete group.idGroup
        this.collection.doc(idGroup).set(group.getData());
    }

    getUserGroups(userId:string){
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
