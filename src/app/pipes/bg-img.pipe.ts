import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bgImg'
})
export class BgImgPipe implements PipeTransform {
  default = 'assets/img/default-bg.jpg';
  transform(value: any, placeholder: string = null): any {
    return `url(${value || placeholder || this.default})`;
  }
}
