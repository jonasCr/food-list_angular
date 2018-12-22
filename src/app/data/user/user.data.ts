import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { User } from "../../shared/models/user.model";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class UserData {
    collection:AngularFirestoreCollection<User> = this._afs.collection('users');
    constructor(private _afs:AngularFirestore){}

    getUser(userId:string){
        return this.collection.doc(userId).snapshotChanges().pipe(
            map((user) =>  {
                const data = user.payload.data();
                const userId = user.payload.id;
                return {userId, ...data}
            })
        );
    }

    setUser(user:User){
        let data = user.getData();
        delete data.userId
        return this.collection.doc(user.userId).set(data);
    }

    getUserByEmail(email:string){
        return this._afs.collection('users', ref => ref.where('email', '==', email))
            .snapshotChanges().pipe(
                map(user => user.map(u => {
                    const data:any = u.payload.doc.data();
                    const idUser = u.payload.doc.id;
                    return {idUser, ...data};
                }))
            )
    }

}