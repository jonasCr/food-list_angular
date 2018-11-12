import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {

  transform(day: number): string {
    switch (day){
      case 0: return 'Domingo';
      case 1: return 'Lunes';
      case 2: return 'Martes';
      case 3: return 'Miercoles';
      case 4: return 'Jueves';
      case 5: return 'Viernes';
      case 6: return 'Sabado';
        
    }
  }

}
