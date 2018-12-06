import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { User } from "../shared/models/user.model";
import { map } from 'rxjs/operators';


@Injectable({
    providedIn:'root'
})

export class UserData {
    collection:AngularFirestoreCollection<User> = this._afs.collection('users');
    constructor(private _afs:AngularFirestore){}

    getUser(userId:string){
        return this.collection.doc(userId).snapshotChanges().pipe(
            map(user =>  {
                const data = user.payload.data();
                const userId = user.payload.id;
                return {userId, ...data}
            })
        );
    }

    setUser(user:User){
        let idUser = user.userId;
        delete user.userId
        this.collection.doc(idUser).set(user.getData());
    }

}