import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {
  constructor(private translate:TranslateService){}
  transform(day: number): string {
    let response:string

    switch (day){
      case 0: response = this.translate.instant('GLOBAL.WEEKDAYS.SUNDAY');break;
      case 1: response = this.translate.instant('GLOBAL.WEEKDAYS.MONDAY');break;
      case 2: response = this.translate.instant('GLOBAL.WEEKDAYS.TUESDAY');break;
      case 3: response = this.translate.instant('GLOBAL.WEEKDAYS.WEDNESDAY');break;
      case 4: response = this.translate.instant('GLOBAL.WEEKDAYS.THURSDAY');break;
      case 5: response = this.translate.instant('GLOBAL.WEEKDAYS.FRIDAY');break;
      case 6: response = this.translate.instant('GLOBAL.WEEKDAYS.SATURDAY');break;
      
    }
    return response
  }

}
