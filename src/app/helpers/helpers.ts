import { FormArray, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

export class Helpers {

  public static setFilter(filter: any) {
    return new CleanFilter().json(filter).getFilter();
  }

  /**
   * @description check if a letibale is empty or not
   * undefine, null, false, 0 '', '0', []
   * @param mixedVar
   */
  public static empty(mixedVar) {
    let undef;
    let key;
    let i;
    let len;
    let emptyValues = [undef, null, false, 0, '', '0'];

    for (i = 0, len = emptyValues.length; i < len; i++) {
      if (mixedVar === emptyValues[i]) {
        return true;
      }
    }

    if (typeof mixedVar === 'object') {
      for (key in mixedVar) {
        if (mixedVar.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }

    return false;
  }

  public static isValidDate(str: any) {
    if (Date.parse(str) > 0) {
      return true;
    }
    return false;
  }


  public static cleanMobileNumber(str: any) {
    let formatted = '';
    if (str && str.length > 4) {
      formatted = str.replace('+', '').replace(/ /g, '');
    }
    return formatted;
  }

  /**
   * @description clone an object by value
   * @param json Object
   */
  public static cloneObj(json: any) {
    return JSON.parse(JSON.stringify(json));
  }

  /**
   * @description check if a value exist in array
   * @param needle value to check
   * @param haystack source array
   * @param argStrict strict check (also check the type of letiable)
   * @returns boolean
   */
  public static inArray(needle: any, haystack: any, argStrict: boolean = false) {
    // eslint-disable-line camelcase

    let key = '';
    let strict = !!argStrict;

    // we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] === ndl)
    // in just one for, in order to improve the performance
    // deciding wich type of comparation will do before walk array
    if (strict) {
      for (key in haystack) {
        if (haystack[key] === needle) {
          return true;
        }
      }
    } else {
      for (key in haystack) {
        if (haystack[key] == needle) {
          // eslint-disable-line eqeqeq
          return true;
        }
      }
    }

    return false;
  }

  public static getResponseError(response: any) {
    let error: any = {};
    if (response.error) {
      error = response;
    } else {
      error = {
        statue: false,
        code: response.statue || 500,
        messahe: response.statusText || 'Internal server error occured',
        error: {
          code: response.name || 'INTERNAL_SERVER_ERROR',
          detail: null,
          html: response.statusText || 'Internal server error occured',
        }
      };
    }
    return error;
  }

  /**
   * @description remove an element from array
   * @param needle element to remove
   * @param haystack source array
   * @returns new array
   */
  public static removeFromArray(needle: any, haystack: any, field: any = null) {
    if (field) {
      haystack = haystack.filter((el: any) => {
        return el[field] != needle;
      });
    } else {
      let index = haystack.indexOf(needle);
      if (index > -1) {
        haystack.splice(index, 1);
      }
    }
    return haystack;
  }

  /**
   * @description remove duplicates from array
   * @param array source array
   * @param prop poroperty to search for duplication
   */
  public static removeDuplicates(array, prop) {
    return array.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }


  public static displayFormErrors(form: FormGroup, scroll: boolean = false) {
    Object.keys(form.controls).forEach(key => {
      let control = form.controls[key];
      // if(control.errors){
      //   console.log('---->>>'+key);
      // }else{
      //   console.log(key);
      // }
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();
      if (control instanceof FormArray) {
        control.controls.forEach(k => {
          if (k instanceof FormControl) {
            k.markAsTouched();
            k.markAsDirty();
            k.updateValueAndValidity();
          } else if (k instanceof FormGroup) {
            Helpers.displayFormErrors(k);
          }
        });
      }
    });

    // if (scroll) {
    //   let invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
    //   if (invalidFields.length !== 0) {
    //     invalidFields[1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    //   }
    // }
  }

  public static displayFieldErrors(form: any, field: any) {
    form.controls[field].markAsTouched();
    form.controls[field].markAsDirty();
    form.controls[field].updateValueAndValidity();
  }

  /**
   * @description merge arrays of object by key
   * @param array1 array
   * @param array2 array
   */
  public static mergeArrays(key: any, array1: any, array2: any) {
    let hash = new Map();
    array1.concat(array2).forEach((obj: any) => {
      hash.set(obj[key], Object.assign(hash.get(obj[key]) || {}, obj));
    });
    let array3 = Array.from(hash.values());
    return array3;
  }

  public static getDateRange(value: any) {
    let resp = { from: '', to: '' };
    switch (value) {
      case 'custom':
        resp.from = '';
        resp.to = '';
        break;
      default:
      case 'today':
        resp.from = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'last_30_days':
        resp.from = moment().subtract(30, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'last_60_days':
        resp.from = moment().subtract(60, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'last_90_days':
        resp.from = moment().subtract(90, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'this_month':
        resp.from = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'this_quarter':
        resp.from = moment().startOf('quarter').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().endOf('quarter').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'this_year':
        resp.from = moment().startOf('year').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().endOf('year').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'last_month':
        resp.from = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'last_quarter':
        resp.from = moment().subtract(1, 'quarter').startOf('quarter').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().subtract(1, 'quarter').endOf('quarter').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'last_year':
        resp.from = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'post_dated':
        resp.from = moment().add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().add(1, 'year').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'all':
        resp.from = moment('1 January 1970').startOf('year').format('YYYY-MM-DD HH:mm:ss');
        resp.to = moment().endOf('year').format('YYYY-MM-DD HH:mm:ss');
        break;
    }

    return resp;
  }

  public static scrollToView() {
    let invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
    if (invalidFields.length >= 1) {
      invalidFields[1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

export class CleanFilter {

  private SearchForm: FormGroup;
  private filter: any = {};

  constructor(SearchForm: FormGroup | object = null) {
    if (SearchForm instanceof FormGroup) {
      this.SearchForm = SearchForm;
      this.filter = this.SearchForm.getRawValue();
    } else {
      this.filter = SearchForm;
    }
    if (!Helpers.empty(this.filter)) {
      this.clean();
    }
  }

  public form(SearchForm: FormGroup) {
    this.SearchForm = SearchForm;
    this.clean();
    return this;
  }

  public json(json: object) {
    this.filter = json;
    this.clean();
    return this;
  }

  public getFilter() {
    return this.filter;
  }

  private clean() {
    if (!Helpers.empty(this.filter.where)) {
      this.filter.where = this.cleanWhere(this.filter.where);
      if (Helpers.empty(this.filter.where)) {
        delete this.filter.where;
      }
    }
    return this.filter;
  }

  private cleanWhere(where: any) {
    if (where) {
      if (where.and) {
        where.and = this.cleanWhereGroup(where.and);
        if (Helpers.empty(where.and)) {
          delete where.and;
        }
      }

      if (where.or) {
        where.or = this.cleanWhereGroup(where.or);
        if (Helpers.empty(where.or)) {
          delete where.or;
        }
      }

      if (Helpers.empty(where.wildcard) || where.wildcard.value === '') {
        delete where.wildcard;
      }

      if (Helpers.empty(where.value)) {
        delete where.field;
        delete where.value;
        delete where.operator;
        delete where.sub_operator;
      }
    }

    return !Helpers.empty(where) ? where : null;
  }

  private cleanWhereGroup(group: any) {

    let cleanGroup = group.filter((e: any) => {
      if (typeof e.value === 'object') {
        return this.cleanWhere(e.value) ? true : false;
      } else if ((e.value !== '' && (e.value !== null || e.operator === 'null'))) {
        return true;
      }
    });

    return !Helpers.empty(cleanGroup) ? cleanGroup : null;
  }
}
