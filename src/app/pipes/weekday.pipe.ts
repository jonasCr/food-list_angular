import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {

  transform(day: number): string {
    let response:string

    switch (day){
      case 0: response = 'Domingo';break;
      case 1: response = 'Lunes';break;
      case 2: response = 'Martes';break;
      case 3: response = 'Miercoles';break;
      case 4: response = 'Jueves';break;
      case 5: response = 'Viernes';break;
      case 6: response = 'Sabado';break;
      
    }
    return response
  }

}
