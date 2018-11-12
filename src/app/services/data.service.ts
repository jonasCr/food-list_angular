import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { recipe } from '../models/recipe.model';
import { menu } from '../models/menu.model';
import { query } from '../models/query.model';


@Injectable({
  providedIn: 'root',
})
export class DataService {
    recipe:Observable<recipe>;
    
    constructor(private _db:AngularFirestore){
        
    }

    addRecipe(recipe:recipe){
        this._db.collection('recipe').add(recipe);
    }

    getRecipes() {
       return this._db.collection('recipe').snapshotChanges().pipe(
           map(recipes => recipes.map( a =>{
               const data = a.payload.doc.data();
               const idRecipe = a.payload.doc.id;
               return {idRecipe, ...data}
           }))
       ); 
    }

    addMenu(menu:menu){
        this._db.collection('menus').add(menu);
    }

    getMenus(query:query):Observable<any[]>{
        return this._db.collection('menus', ref => ref.where('day', '>=', query.firstDay).where('day', '<=', query.lastDay))
            .snapshotChanges().pipe(
                map(menus => menus.map(a => {
                    const data = a.payload.doc.data();
                    const idMenu = a.payload.doc.id;
                    return {idMenu,...data}
                }))
            );
    }

    updateMenu(menu:any){
        console.log(menu);
        if (menu.lunch){
            let change = {lunch : menu.lunch}
            this._db.collection('menus').doc(menu.idMenu).set(menu);
        }else if (menu.dinner){
            let change = {lunch : menu.dinner}
            this._db.collection('menus').doc(menu.idMenu).update(menu);
        }
        
    }

    

    
}