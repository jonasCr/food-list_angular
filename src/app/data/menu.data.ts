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

    getRangeDay(day:Date = new Date()):query{
        let dateString:string = day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate();
        
        let response:query = new query({
            firstDay: new Date(dateString),
            lastDay: new Date(dateString)
        })

        day.setHours(0,0,0,0);
        let weekDay:number = day.getDay() != 0 ? day.getDay(): 7;
        
        //Se determina el primer dia de la semana restando el numero del dia al dia de hoy
        response.firstDay.setHours(0,0,0,0);
        response.firstDay.setDate(day.getDate() - weekDay+1)

        //Se determina el ultimo dia de la semana
        response.lastDay.setHours(0,0,0,0);
        response.lastDay.setDate(day.getDate() + (7-weekDay))
        //console.log(lastDay);
        return response;
    }

    updateMenu(menu:Menu){
        console.log(menu);
        return this.collection.doc(menu.idMenu).update(menu.getData());
        
    }

    getMenusByQuery(query:query):Observable<any[]>{
        return this._afs.collection('menus', ref => ref.where('day', '>=', query.firstDay).where('day', '<=', query.lastDay))
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

    menuToObject(menu:Menu):Menu{
        let response:Menu = Object.assign({},menu);
        if(response.meals){
            for (let iM in response.meals ){
                response.meals[iM] = Object.assign({}, response.meals[iM]);
                for (let iI in response.meals[iM].ingredientsList){
                    response.meals[iM].ingredientsList[iI] = Object.assign({}, response.meals[iM].ingredientsList[iI]);
                }
                if (response.meals[iM].image){
                    response.meals[iM].image = Object.assign({},response.meals[iM].image);
                }
            }
        }
        

        return response;
    }
    


    
}