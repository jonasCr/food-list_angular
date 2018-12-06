import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
    progress:boolean = false;
    title:string;
    logged:boolean;
    constructor(){
    }

    setTitle(title:string):void{
        this.title = title;
    }

}