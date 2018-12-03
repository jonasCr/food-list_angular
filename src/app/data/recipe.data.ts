import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Recipe } from '../shared/models/recipe.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RecipeData {
    collection:AngularFirestoreCollection<Recipe> = this._afs.collection('recipe');
    constructor(private _afs:AngularFirestore){}

    addRecipe(recipe:Recipe){        
        this.collection.add(recipe.getData());
    }

    getRecipe(idRecipe:string){
        return this.collection.doc(idRecipe).snapshotChanges().pipe(
            map(recipe =>  {
                const data = recipe.payload.data();
                const idRecipe = recipe.payload.id;
                return {idRecipe, ...data}
            })
        );
    }

    getRecipes():any{
       return this.collection.snapshotChanges().pipe(
           map(recipes => recipes.map( a =>{
               const data = a.payload.doc.data();
               const idRecipe = a.payload.doc.id;
               return {idRecipe, ...data}
           }))
       ); 
    }

    updateRecipe(recipe:Recipe){
        this.collection.doc(recipe.idRecipe).set(recipe.getData());
    }

    deleteRecipe(recipe:Recipe){
        this.collection.doc(recipe.idRecipe).delete();
    }
    
}