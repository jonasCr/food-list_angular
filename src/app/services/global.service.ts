import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
    
    title:string= "Hola"
    constructor(){
        //console.log('global')
    }

    setTitle(title:string):void{
        this.title = title;
    }
}