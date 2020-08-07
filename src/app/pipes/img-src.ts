import {Pipe, PipeTransform} from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imgSrc',
})
export class ImgSrcPipe implements PipeTransform {

  transform(value: string, placeholder: string = 'placeholder.png') {
    let regex = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i);
    if (!value) {
      return 'assets/img/' + placeholder;
    } else if (regex.test(value)) {
      return value;
    } else {
      return environment.apiUrl.replace('api/', '') + value;
    }
  }
}
