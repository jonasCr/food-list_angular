import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
    progress:boolean = false;
    title:string= "Hola"
    constructor(){
    }

    setTitle(title:string):void{
        this.title = title;
    }

    setProgress(value:boolean){
        this.progress = value;
    }


}