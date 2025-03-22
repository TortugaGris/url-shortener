import { Pipe, PipeTransform } from '@angular/core';
import {DateTime} from 'luxon'

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: DateTime | null | undefined, format: string = 'dd/MM/yy'): string {
    if (!value) return '';
    return value.toFormat(format);
  }
}
