import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Group, ParamsGroup } from "src/app/shared/models/group.model";
import { UserData } from "src/app/data/user/user.data";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-group-dialog',
    templateUrl: './group-dialog.component.html'
})

export class GroupDialogComponent {
    nameGroup:string;
    emailInvited:string;
    userValid:boolean = false;
    userInvitadedId:string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data:any,
        public dialogRef:MatDialogRef<GroupDialogComponent>,
        private uData:UserData,
        private authService:AuthService
    ){

    }

    onNoClick(){
        this.dialogRef.close();
    }

    checkUser(){
        this.userValid = false;
        console.log(this.emailInvited);
        this.uData.getUserByEmail(this.emailInvited).subscribe((data)=> {
            if(data.length > 0){
                this.userInvitadedId = data[0].idUser;
                this.userValid = true;
            }
        })
    }
    
    sendData(){
        let data = {
            groupName: this.nameGroup,
            userInvitated: this.userInvitadedId
        }

        this.dialogRef.close(data);
    }
}