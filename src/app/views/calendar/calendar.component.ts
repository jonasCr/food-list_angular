import { Component, OnDestroy } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";
import { Menu } from "src/app/shared/models/menu.model";
import { Recipe, ParamsRecipe } from "src/app/shared/models/recipe.model";
import { Subscription } from "rxjs";
import { MenuData } from "src/app/data/menu.data";
import { RecipeData } from "src/app/data/recipe.data";
import { NotificationService } from "src/app/services/notificacion.service";
import { Router } from "@angular/router";
import { query } from "../../shared/models/query.model";
import { MenuListService } from "./../../services/list-menu.service";

@Component({
    selector:'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnDestroy{
    menus:Menu[] = [];
    recipes:Recipe[] = [];
    selectedRecipes:Recipe[] = [];
    menuListObs:Subscription;
    recipesObs:Subscription;
    dateBase:Date= new Date();
    firstDay:Date;
    lastDay:Date;
    constructor(
            private router:Router,
            private _notif:NotificationService,
            private _globalService:GlobalService,
            public _menuList:MenuListService,
            public _menuData:MenuData,
            public _recipeDate:RecipeData
        ){
        this._globalService.setTitle('Calendar');
        this._globalService.progress = true;
        this.recipesObs = this._recipeDate.getRecipes().subscribe((recipes:any[])=> {
            this.recipes = [];

            for (let recipe of recipes){
                this.recipes.push(new Recipe(recipe));
            }
            if (this.recipes.length == 0){
                this._notif.showMessage('Tienes que crear recetas antes de poder usar la app');
                this.router.navigate(['/recipe/create'])
            }
            
        });
        
        this._globalService.progress= false
    }

    ngOnDestroy(){
        this.menuListObs.unsubscribe();
        this.recipesObs.unsubscribe();
    }

    onChange(recipe, iMenu, iMeal){  
        this._globalService.progress = true
        let params:ParamsRecipe = this.recipes[recipe.value];
        params.idMeal = this.menus[iMenu].meals[iMeal].idMeal;
        this.menus[iMenu].meals[iMeal] = new Recipe(params);
        this._menuData.updateMenu(this.menus[iMenu]).then(()=> {
            this._globalService.progress= false
        })
    }

    updateRecipe(event:ParamsRecipe, iMenu:number, iMeal:number){
        this._globalService.progress = true;
        event.idMeal = this.menus[iMenu].meals[iMeal].idMeal
        this.menus[iMenu].meals[iMeal] = new Recipe(event);
        this._menuData.updateMenu(this.menus[iMenu]).then(()=> {
            this._globalService.progress= false
        })
        

    }

    deleteRecipeFromMenu(meal:number, menu:number){
        let idMeal = this.menus[menu].meals[meal].idMeal
        this.menus[menu].meals[meal] = new Recipe({idMeal: idMeal});
        this._menuData.updateMenu(this.menus[menu]);
    }

    getMenus(event:query){
        //this._globalService.progress = true;
        if (this.menuListObs){
            this.menuListObs.unsubscribe;
        }
        this._globalService.progress = true;
        this._menuList.createCalendar(event);
        this.menuListObs = this._menuData.getMenusByQuery(event).subscribe((menus:Menu[])=> {
            this.menus = [];
            for (let i = 0; i < menus.length; i++){
                this.menus.push(new Menu(menus[i]));
            }
            
        })
        this._globalService.progress = false;
        
    }


}