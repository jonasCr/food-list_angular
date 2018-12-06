import { Injectable } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { Group } from "../shared/models/group.model";

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
}

