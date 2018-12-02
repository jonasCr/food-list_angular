import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Item } from '../shared/models/item.model';

@Injectable({
    providedIn: 'root',
})
export class IngredientData {
    collection:AngularFirestoreCollection<Item> = this._afs.collection('ingredient');
    constructor(
        public _afs:AngularFirestore
    ){

    }

    getIngredient(){
        return this._afs.collection('ingredient').snapshotChanges().pipe(
            map(ingredient => ingredient.map( a =>{
                const data = a.payload.doc.data();
                const idIngredient = a.payload.doc.id;
                return {idIngredient, ...data}
            }))
        ); 
    }

    addIngredient(ingredient:Item):Promise<Item>{
        return new Promise(resolve => {
            this.collection.add(Object.assign({}, ingredient)).then((refDoc)=> {
                ingredient.idIngredient = refDoc.id;
                resolve(ingredient)
            })
        })
        
    }

    updateIngredient(ingredient:Item){
        this.collection.doc(ingredient.idIngredient).set(ingredient)
    }

    deleteIngredient(ingredient:Item){
        this.collection.doc(ingredient.idIngredient).delete();
    }
}

