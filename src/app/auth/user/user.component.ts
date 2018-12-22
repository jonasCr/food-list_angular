import { Component, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/auth/auth.service";
import { GroupData } from "src/app/data/user/group.data";
import { User } from "src/app/shared/models/user.model";
import { Group, ParamsGroup } from "src/app/shared/models/group.model";
import { MatMenuTrigger, MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { GroupDialogComponent } from "../group/group-dialog.component";
import { GlobalService } from "src/app/services/global.service";
import { NotificationService } from "src/app/services/notificacion.service";
import { NotificationData } from "src/app/data/user/notification.data";
import { NotificationParams, Notification } from "src/app/shared/models/notification.model";

@Component({
    selector:'app-user',
    templateUrl: './user.component.html'
})

export class UserComponent {
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger
    user:User;
    userGroups:Group[]
    constructor(
        public afAuth:AngularFireAuth,
        public authService:AuthService,
        private gData:GroupData,
        private router:Router,
        public dialog:MatDialog,
        private gService:GlobalService,
        private nService:NotificationService,
        private nData:NotificationData
        ){
            //this.login();

    }

    openMenu(){
        //debugger;
        if (this.authService.user != null){
            this.trigger.openMenu();
        }else {
            this.router.navigate(['/login'])
        }
    }

    logOut(){
        this.authService.signOut();
    }

    createInvitation(){
        const dialogRef = this.dialog.open(GroupDialogComponent, {
            width: '375px',
            maxWidth: '100vw'
        });

        dialogRef.afterClosed().subscribe((data)=> {
            if(data){
                console.log(data);
                this.gService.progress = true;
                let pGroup:ParamsGroup = {
                    name : data.nameGroup,
                    membersIDs: [this.authService.user.userId]
                }

                this.gData.createGroup(new Group(data)).then(()=> {
                    let pNotification:NotificationParams = {
                        fromIdUser: this.authService.user.userId,
                        toIdUser: data.userInvitadedId,
                        content: 'Quiero añadirte a un grupo',
                        date: new Date(),
                    }
                    this.nData.addNotification(new Notification(pNotification)).then(()=> {
                        this.gService.progress = false;
                        this.nService.showMessage('Se ha enviado una notification al usuario.')
                    })
                })


            }
        })
    }
}