import { Routes, RouterModule } from "@angular/router";
import { CalendarComponent } from "./views/calendar/calendar.component";
import { ListComponent } from "./views/list/list.component";
import { RecipeComponent } from "./views/recipe/recipe.component";

const ROUTES:Routes = [
    {path: 'calendar', component: CalendarComponent},
    {path: 'list', component: ListComponent},
    {path: 'recipe', component: RecipeComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'calendar'}
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);