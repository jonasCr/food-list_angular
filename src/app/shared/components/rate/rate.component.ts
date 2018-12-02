import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector:'app-rate',
    template: `
        <i 
            (click)="rateRecipe(grade+1)" 
            *ngFor="let grade of 5 | numberToArray; let i = index" 
            [ngClass]="{'stars': isStar(i)}" 
            class="fas fa-star fa-lg"></i>
    `
})

export class RateComponent{
    constructor(){
        
    }

    @Input() grade:number;
    @Output() updatedGrade:EventEmitter<number> = new EventEmitter;;

    rateRecipe(rate:number){
        this.updatedGrade.emit(rate)
    }

    isStar(i){
        return i < this.grade
    }
}