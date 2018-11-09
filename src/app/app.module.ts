import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//Routes
import { APP_ROUTES } from './app.routes';

//FireBase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

//Modules
import { MaterialModule } from './material.module';
import { FirebaseModule } from './firebase.module';

//Component
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { ListComponent } from './views/list/list.component';
import { RecipeComponent } from './views/recipe/recipe.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalendarComponent,
    ListComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    FirebaseModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
