import { Routes, RouterModule } from "@angular/router";
import { CalendarComponent } from "./views/calendar/calendar.component";
import { ListComponent } from "./views/calendar/list/list.component";
import { RecipeComponent } from "./views/recipe/recipe.component";
import { RecipeEditComponent } from "./views/recipe-edit/recipe-edit.component";
import { UserComponent } from "./shared/components/login/login.component";

const ROUTES:Routes = [
    {path: '', component: CalendarComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'list', component: ListComponent},
    {path: 'recipe', component: RecipeComponent},
    {path: 'recipe/:idRecipe', component:RecipeEditComponent},
    {path: 'user', component:UserComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'calendar'},
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);