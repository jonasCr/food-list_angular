import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegistrerComponent } from './register/registrer.component';
import { MaterialModule } from '../material.module';


@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        RegistrerComponent
    ],
    imports: [ 
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
        
    ],
    exports: [
        UserComponent,
        LoginComponent,
        RegistrerComponent
    ],
    providers: [],
})
export class AuthModule {}