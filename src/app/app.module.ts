import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';

//Routes
import { APP_ROUTES } from './app.routes';

//FireBase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

//Modules
import { MaterialModule } from './material.module';
import { FirebaseModule } from './firebase.module';

//Pipes
import { WeekdayPipe } from './pipes/weekday.pipe';

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
    RecipeComponent,
    WeekdayPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    FirebaseModule,
    FormsModule,
    APP_ROUTES
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
