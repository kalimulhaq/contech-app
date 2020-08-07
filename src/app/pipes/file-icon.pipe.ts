import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileIcon'
})
export class FileIconPipe implements PipeTransform {

  transform(type: any): any {
    if (type === 'image') {
      return 'file-image';
    } else if (type === 'word') {
      return 'file-word';
    } else if (type === 'excel') {
      return 'file-excel';
    } else if (type === 'ppt') {
      return 'file-ppt';
    } else if (type === 'pdf') {
      return 'file-pdf';
    } else if (type === 'text') {
      return 'file-text';
    } else if (type === 'Policy') {
      return 'safety-certificate';
    } else if (type === 'Procedure') {
      return 'setting';
    } else {
      return 'file-unknown';
    }
  }

}

