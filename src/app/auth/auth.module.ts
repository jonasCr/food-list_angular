import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegistrerComponent } from './register/registrer.component';


@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        RegistrerComponent
    ],
    imports: [ 
        CommonModule,
        
    ],
    exports: [
        UserComponent,
        LoginComponent,
        RegistrerComponent
    ],
    providers: [],
})
export class AuthModule {}