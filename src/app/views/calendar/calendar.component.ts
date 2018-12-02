import { Component, OnDestroy } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";
import { Menu, ParamsMenu } from "src/app/shared/models/menu.model";
import { MenuListService } from "./list-menu.service";
import { Recipe, ParamsRecipe } from "src/app/shared/models/recipe.model";
import { Subscription } from "rxjs";
import { MenuData } from "src/app/data/menu.data";
import { RecipeData } from "src/app/data/recipe.data";
import { NotificationService } from "src/app/services/notificacion.service";
import { Router } from "@angular/router";

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
    constructor(
            private router:Router,
            private _notif:NotificationService,
            private _globalService:GlobalService,
            public  _menuList:MenuListService,
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
        this.menuListObs = this._menuList.listMenu.subscribe((menu:Menu[])=> {
            this.menus = [];
            for (let menuItem of menu){
                
                // menuItem.day = menuItem.day.toDate();
                this.menus.push(new Menu(menuItem))
            }

            //this.menus = menu;
        })
        
        this._globalService.progress= false
    }

    ngOnDestroy(){
        this.menuListObs.unsubscribe();
        this.recipesObs.unsubscribe();
    }

    onChange(recipe, iMenu, iMeal){  
       let params:ParamsRecipe = this.recipes[recipe.value];
       params.idMeal = this.menus[iMenu].meals[iMeal].idMeal;
       this.menus[iMenu].meals[iMeal] = new Recipe(params);
       this._menuData.updateMenu(this.menus[iMenu]).then(()=> {

       })
    }

    getPrevWeek(){
        this._globalService.progress = true;
        this.menus= [];

        this.menuListObs.unsubscribe();
        this.dateBase = this._menuList.getPrevWeek(this.dateBase);
        this.menuListObs = this._menuList.listMenu.subscribe((menu:Menu[])=> {
            for (let menuItem of menu){
                
                this.menus.push(new Menu(menuItem))
                this._globalService.progress = false;
            }
        })

    }

    getNextWeek(){
        this._globalService.progress = true;
        this.menus= [];
        this.menuListObs.unsubscribe();
        this.dateBase = this._menuList.getNextWeek(this.dateBase);
        this.menuListObs = this._menuList.listMenu.subscribe((menu:Menu[])=> {
            for (let menuItem of menu){
                
                this.menus.push(new Menu(menuItem))
            }
            this._globalService.progress = false;
        })
    }

    deleteRecipeFromMenu(meal:number, menu:number){
        let idMeal = this.menus[menu].meals[meal].idMeal
        this.menus[menu].meals[meal] = new Recipe({idMeal: idMeal});
        this._menuData.updateMenu(this.menus[menu]);
    }
}