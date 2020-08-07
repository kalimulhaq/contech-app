import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showFromTo'
})
export class ShowFromToPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let from = value.from || 0;
    let to = value.to || 0;
    let total = value.totalItems || 0;
    return `Showing ${from} to ${to} of ${total}`;
  }

}
