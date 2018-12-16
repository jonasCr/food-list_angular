import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { UserToken } from './shared/models/userToken.model';
import { UserData } from './data/user.data';
import { User } from './shared/models/user.model';
import { GroupData } from './data/group.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
      public  _globalService:GlobalService,
      private authService:AuthService,
      private router:Router,
      private userData:UserData,
      private groupData:GroupData
    ){
      let token:UserToken = JSON.parse(localStorage.getItem('user'));
      if (token != undefined && token.expire <= new Date()){
        this.authService.setUserData(token.userID);
        localStorage.setItem('user', JSON.stringify(new UserToken(token.userID)));
      }else {
        this.router.navigate(['/login'])
      }
  }
}
