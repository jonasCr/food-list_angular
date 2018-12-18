import { Component, Input, OnInit } from "@angular/core";
import { Notification } from "src/app/shared/models/notification.model";
import { User, ParamsUser } from "src/app/shared/models/user.model";
import { UserData } from "src/app/data/user/user.data";

@Component({
    selector:'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit{
    @Input() notification:Notification;
    userFrom:User
    constructor(
        private userData:UserData
    ){
        

    }
    ngOnInit(){
        console.log(this.notification)
        this.userData.getUser(this.notification.fromIdUser).subscribe((data:ParamsUser)=> {
            this.userFrom = new User(data);
            console.log(this.userFrom);
        })

    }
}