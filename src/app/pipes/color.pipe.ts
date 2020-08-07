import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  colors = {
    new: '#faad14',
    'in process': '#1890ff', // '#5DB1FF',
    graded: '#66ff66', // '#1890ff',
    completed: '#007f00', // '#54d76a',
    cancelled: '#ff4444',
    accepted: '#54d76a',
    pending: '#ffd54f',
    processed: '#00C851',
    expired: '#ff4444',
    enable: '#54d76a',
    disbled: '#d9d9d9',
  };

  defaultColor = '#d9d9d9';
  transform(value: string, defaultC?: string): any {
    if (!value) {
      return defaultC || this.defaultColor;
    } else {
      return this.colors[value.toLowerCase()] || defaultC || this.defaultColor;
    }
  }
}
