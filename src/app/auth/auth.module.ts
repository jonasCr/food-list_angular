import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegistrerComponent } from './register/registrer.component';
import { MaterialModule } from '../material.module';
import { NotificationComponent } from './notification/notificaction.component';
import { NotificationDetailsComponent } from './notification/notification-details.component';
import { GroupDialogComponent } from './group/group-dialog.component';


@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        RegistrerComponent,
        NotificationComponent,
        NotificationDetailsComponent,
        GroupDialogComponent
    ],
    entryComponents:[
        NotificationDetailsComponent,
        GroupDialogComponent
    ],
    imports: [ 
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule, 
    ],
    exports: [
        UserComponent,
        LoginComponent,
        RegistrerComponent,
        NotificationComponent
    ],
    providers: [],
})
export class AuthModule {}