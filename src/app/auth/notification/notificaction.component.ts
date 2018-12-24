import { Component, Input, OnInit } from "@angular/core";
import { Notification } from "src/app/shared/models/notification.model";
import { User, ParamsUser } from "src/app/shared/models/user.model";
import { UserData } from "src/app/data/user/user.data";
import { NotificationData } from "src/app/data/user/notification.data";
import { MatDialog } from "@angular/material";
import { NotificationDetailsComponent } from "./notification-details.component";
import { GroupData } from "src/app/data/user/group.data";
import { ParamsGroup, Group } from "src/app/shared/models/group.model";
import { AuthService } from "../auth.service";

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
        private gData:GroupData,
        private authService:AuthService
    ){
        

    }
    ngOnInit(){
        this.userData.getUser(this.notification.fromIdUser).subscribe((data:ParamsUser)=> {
            this.userFrom = new User(data);
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
            if (data){
                let groupObs = this.gData.getGroup(this.notification.data).subscribe((group:Group)=> {
                    group.membersIDs.push(this.authService.user.userId);
                    this.gData.updateGroup(group);
                    groupObs.unsubscribe();
                })
            }
        })
    }
}