import { Component, ViewChild, OnDestroy } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";
import { MenuData } from "src/app/data/menu.data";
import { query } from "src/app/shared/models/query.model";
import { Item } from "src/app/shared/models/item.model";
import { Menu } from "src/app/shared/models/menu.model";
import { MenuListService } from "./../../services/list-menu.service";
import { MatTableDataSource, MatSort } from "@angular/material";
import { Subscription } from "rxjs";

export interface TableItem {
    check: boolean,
    name:string,
    category:string,
    meal:string,
    indexes:{menu:number, meal:number, item:number}
}

@Component({
    selector:'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})


export class ListComponent implements OnDestroy{
    categoryList:string[];
    menuList:Menu[] = [];
    menuListObs:Subscription;

    @ViewChild(MatSort) sort: MatSort;


    ngOnDestroy(): void {
       this.menuListObs.unsubscribe(); 
    }

    displayedColumns: string[] = ['check', 'name', 'category', 'meal'];
    elementData:TableItem[];
    dataSource:MatTableDataSource<TableItem> = new MatTableDataSource(this.elementData);

    constructor(
        private _menuData:MenuData,
        private _globalService:GlobalService,
        public _listService:MenuListService
        ){
        this._globalService.setTitle('Food List');
    }

    onCheck(event, indexes){
        this.menuList[indexes.menu].meals[indexes.meal].ingredientsList[indexes.item].terminate = event.checked;
        this._menuData.updateMenu(this.menuList[indexes.menu])
    }

    addRowToTable(menu:Menu, i){
        if (menu.meals){
            for (let mealI= 0; mealI< menu.meals.length; mealI++){
                if (menu.meals[mealI].ingredientsList){
                    for (let itemI = 0; itemI< menu.meals[mealI].ingredientsList.length; itemI++){
                        let newItem:TableItem = {
                            check: menu.meals[mealI].ingredientsList[itemI].terminate,
                            name: menu.meals[mealI].ingredientsList[itemI].name,
                            category: menu.meals[mealI].ingredientsList[itemI].category,
                            meal: menu.meals[mealI].name,
                            indexes: {
                                menu: i,
                                meal: mealI,
                                item: itemI
                            }
                        }
                        this.elementData.push(newItem);
                        this.dataSource = new MatTableDataSource(this.elementData);
                        this.dataSource.sort = this.sort
                    }
                }
                
            }
        }
    }

    getMenus(event:query){
        this._globalService.progress = true;
        if (this.menuListObs){
            this.menuListObs.unsubscribe();
        }
        //this.menuList = [];
        this.menuListObs = this._menuData.getMenusByQuery(event).subscribe((menus:Menu[])=> {
            this.menuList = [];
            this.elementData = [];
            for (let i = 0; i < menus.length; i++){
                this.menuList.push(new Menu(menus[i]))
                this._globalService.progress = false;
                this.addRowToTable(menus[i], i );
            }
        })
        this._globalService.progress = false;

    }

    
}