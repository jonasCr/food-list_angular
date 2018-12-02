import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root',
})


export class NotificationService{
    

    constructor(
        public snackBar:MatSnackBar
    ){}

    showMessage(msg:string){
        this.snackBar.open(msg, 'OK', {
            duration: 5000
        })
    }
}