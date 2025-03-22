import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, suffix: string = '...'): string {
    if(!value) return '';
    if(value.length > limit) {
      return value.substring(0, limit) + suffix;
    }
    return value;
  }
}
