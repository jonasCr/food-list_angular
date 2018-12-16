import { Component, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/auth/auth.service";
import { GroupData } from "src/app/data/user/group.data";
import { User } from "src/app/shared/models/user.model";
import { Group } from "src/app/shared/models/group.model";
import { MatMenuTrigger } from "@angular/material";
import { Router } from "@angular/router";

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
        private groupData:GroupData,
        private router:Router
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
}