import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Menu } from '../shared/models/menu.model';
import { query } from '../shared/models/query.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
    providedIn: 'root',
})
export class MenuData {
    collection:AngularFirestoreCollection<Menu> = this._afs.collection('menus');
    constructor(
        private _afs:AngularFirestore
    ){}
    updateMenu(menu:Menu){
        return this.collection.doc(menu.idMenu).update(menu.getData());
        
    }

    getMenusByQuery(query:query):Observable<any[]>{
        //debugger;
        return this._afs.collection('menusDV', ref => ref.where('day', '>=', query.firstDay).where('day', '<=', query.lastDay))
            .snapshotChanges().pipe(
                map(menus => menus.map(a => {
                    const data:any = a.payload.doc.data();
                    const idMenu = a.payload.doc.id;
                    data.day = data.day.toDate();
                    return {idMenu,...data}
                }))
            );
    }
    
    addMenu(menu:Menu){
        this.collection.add(menu.getData());
    }
    


    
}