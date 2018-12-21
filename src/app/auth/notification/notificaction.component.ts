import { Component, Input, OnInit } from "@angular/core";
import { Notification } from "src/app/shared/models/notification.model";
import { User, ParamsUser } from "src/app/shared/models/user.model";
import { UserData } from "src/app/data/user/user.data";
import { NotificationData } from "src/app/data/user/notification.data";
import { MatDialog } from "@angular/material";
import { NotificationDetailsComponent } from "./notification-details.component";

@Component({
    selector:'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit{
    @Input() notification:Notification;
    userFrom:User;
    constructor(
        private userData:UserData,
        private nData:NotificationData,
        public dialog: MatDialog,
    ){
        

    }
    ngOnInit(){
        console.log(this.notification)
        this.userData.getUser(this.notification.fromIdUser).subscribe((data:ParamsUser)=> {
            this.userFrom = new User(data);
            console.log(this.userFrom);
        })

    }

    onClickNotification(){
        this.notification.read = true;
        this.nData.updateNotification(this.notification);
        const dialogRef = this.dialog.open(NotificationDetailsComponent, {
            width: '250px',
            data: this.notification
        });

        dialogRef.afterClosed().subscribe((data)=> {
            console.log(data);
        })
    }

    openDialog(){
        
        

    }
}