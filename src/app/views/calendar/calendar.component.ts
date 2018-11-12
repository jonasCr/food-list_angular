import { Component, OnInit, OnDestroy } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";
import { menu } from "src/app/models/menu.model";
import { MenuListService } from "src/app/services/list-menu.service";
import { DataService } from "src/app/services/data.service";
import { recipe } from "src/app/models/recipe.model";
import { Subscription } from "rxjs";

@Component({
    selector:'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnDestroy{
    menus:menu[];
    firstDay:Date;
    lastDay:Date;
    recipes:recipe[];
    selectedRecipes:{lunch?:recipe, dinner?:recipe}[] = [];
    menuListObs:Subscription;
    recipesObs:Subscription;

    
    today:number= new Date().getDay();

    constructor(
            private _globalService:GlobalService,
            public  _menuList:MenuListService,
            public _dataService:DataService
        ){
        this._globalService.setTitle('Calendar');
        this.menuListObs = this._menuList.listMenu.subscribe((menu:menu[])=> {
            this.menus = menu;
            console.log(this.menus);
        })
        this.recipesObs = this._dataService.getRecipes().subscribe((recipes:any[])=> {
            this.recipes = recipes;
            console.log(this.recipes)
        })
    }

    ngOnDestroy(){
        this.menuListObs.unsubscribe();
        this.recipesObs.unsubscribe();
    }

    onChange(select, menu:menu, meal:string){
        //console.log(select.value);
        console.log(menu);
        console.log(this.recipes[select.value]);
        if (meal == 'lunch'){
            this.selectedRecipes[menu.weekday] = {lunch:this.recipes[select.value]}
        }else if (meal == 'dinner') {
            this.selectedRecipes[menu.weekday].dinner = this.recipes[select.value];
        }
        
        console.log(this.selectedRecipes);    
    }

    saveMenu(menu:menu, meal:string){
        if (meal =='lunch'){
            menu.lunch = this.selectedRecipes[menu.weekday].lunch;
            
        } else if (meal =='dinner'){
            menu.lunch = this.selectedRecipes[menu.weekday].lunch;
        }
        this._dataService.updateMenu(menu)
        console.log(menu);
        
    }
}