import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector:'app-confirm',
    template:`
    <h1 mat-dialog-title>Estas seguro?</h1>
    <div mat-dialog-content>
      <p>Estas a punto de {{action}}. Estas seguro que es lo que quieres hacer ?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Continuar</button>
    </div>
    `
})

export class ConfirmComponent {
    //action:string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public action:string,
        public dialogref:MatDialogRef<ConfirmComponent>
    ){
    }

    onNoClick(){
        this.dialogref.close();
    }
}