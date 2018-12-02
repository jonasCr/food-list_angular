import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray'
})
export class NumberToArray implements PipeTransform {

  transform(number:number):number[] {
    let response:number[]= []
    for (let i=0 ; i<number ; i++){
        response.push(i);
    }
    return response;
  }

}