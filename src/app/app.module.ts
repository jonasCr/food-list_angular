import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
import { NumberToArray } from './pipes/number-to-array.pipe';
import localEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localEs);

//Component
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { ListComponent } from './views/calendar/list/list.component';
import { RecipeComponent } from './views/recipe/recipe.component';
import { RecipeDetails } from './shared/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './views/recipe-edit/recipe-edit.component';
import { RecipeDialogCategory } from './views/recipe-edit/recipe-dialog-category';
import { RateComponent } from './shared/components/rate/rate.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalendarComponent,
    ListComponent,
    RecipeComponent,
    WeekdayPipe,
    RecipeDetails,
    NumberToArray,
    RecipeEditComponent,
    RecipeDialogCategory,
    RateComponent
  ],
  entryComponents: [
    RecipeDialogCategory
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    FirebaseModule,
    FormsModule,
    APP_ROUTES,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
