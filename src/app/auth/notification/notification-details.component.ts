import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Notification } from "src/app/shared/models/notification.model";

@Component({
    selector: 'app-notification-details',
    template: `
    <p>{{data.content}}</p>
    <button mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button [mat-dialog-close]="true">Ok</button>
`
})

export class NotificationDetailsComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data:Notification,
        public dialogRef:MatDialogRef<NotificationDetailsComponent>
    ){}

    onNoClick(): void {
        this.dialogRef.close();
      }
}