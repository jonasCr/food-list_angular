import { Routes, RouterModule } from "@angular/router";
import { CalendarComponent } from "./views/calendar/calendar.component";
import { ListComponent } from "./views/list/list.component";
import { RecipeComponent } from "./views/recipe/recipe.component";
import { RecipeEditComponent } from "./views/recipe-edit/recipe-edit.component";
import { UserComponent } from "./auth/user/user.component";
import { RegistrerComponent } from "./auth/register/registrer.component";
import { LoginComponent } from "./auth/login/login.component";

const ROUTES:Routes = [
    {path: '', component: CalendarComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'list', component: ListComponent},
    {path: 'recipe', component: RecipeComponent},
    {path: 'recipe/:idRecipe', component:RecipeEditComponent},
    {path: 'user', component:UserComponent},
    {path: 'registrer', component:RegistrerComponent},
    {path: 'login', component:LoginComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'login'},
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);