import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { UserToken } from './shared/models/userToken.model';
import { UserData } from './data/user/user.data';
import { User } from './shared/models/user.model';
import { GroupData } from './data/user/group.data';
import { TranslateService } from '@ngx-translate/core';

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
      private translate:TranslateService
    ){
      translate.setDefaultLang('es');
      if (localStorage.getItem('user')!= undefined){
        let token:UserToken = JSON.parse(localStorage.getItem('user'));
        let today = new Date();
        let dateTokenExpire = new Date(token.expire);
        if (dateTokenExpire >= today){
          this.authService.setUserData(token.userID);
          localStorage.setItem('user', JSON.stringify(new UserToken(token.userID)));
        }else {
          //this.router.navigate(['/login'])
        }
      }else {
        //this.router.navigate(['/login'])
      }

  }
}
