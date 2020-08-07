import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  protected path: string;

  constructor(protected http: HttpClient) { }

  setPath(path: string) {
    this.path = path;
  }

  list(filter: CrudFilter = null, limit: number = 0, page: number = 1, groupBy: string = null, extra: object = {}) {
    const endPoint = environment.apiUrl + this.path;
    let params: any = {};
    params.filter = filter ? JSON.stringify(filter) : '{}';
    params.limit = limit;
    params.page = page;
    if (groupBy) {
      params.group_by = groupBy;
    }
    params = Object.assign({}, params, extra);
    return this.http.get(endPoint, { params });
  }

  getOne(filter: CrudFilter = null, extra: object = {}) {
    const endPoint = environment.apiUrl + this.path + '/one';
    let params: any = {};
    params.filter = filter ? JSON.stringify(filter) : '{}';
    params = Object.assign({}, params, extra);
    return this.http.get(endPoint, { params });
  }

  get(id: any, filter: CrudFilter = null, extra: object = {}) {
    const endPoint = environment.apiUrl + this.path + '/' + id;
    let params: any = {};
    params.filter = filter ? JSON.stringify(filter) : '{}';
    params = Object.assign({}, params, extra);
    return this.http.get(endPoint, { params });
  }

  count(filter: CrudFilter = null, extra: object = {}) {
    const endPoint = environment.apiUrl + this.path + '/count';
    let params: any = {};
    params.filter = filter ? JSON.stringify(filter) : '{}';
    params = Object.assign({}, params, extra);
    return this.http.get(endPoint, { params });
  }

  create(data: any) {
    const endPoint = environment.apiUrl + this.path;
    return this.http.post(endPoint, data);
  }

  update(id: any, data: any) {
    const endPoint = environment.apiUrl + this.path + '/' + id;
    return this.http.put(endPoint, data);
  }

  delete(id: any) {
    const endPoint = environment.apiUrl + this.path + '/' + id;
    return this.http.delete(endPoint);
  }

  forceDelete(id: any) {
    const endPoint = environment.apiUrl + this.path + '/' + id + '/force';
    return this.http.delete(endPoint);
  }

  restore(id: any) {
    const endPoint = environment.apiUrl + this.path + '/' + id + '/restore';
    return this.http.get(endPoint);
  }
}

export interface CrudFilterWhere {
  or?: Array<CrudFilterWhere>;
  and?: Array<CrudFilterWhere>;
  wildcard?: WildcardWhere;
  field?: string;
  value?: any;
  operator?: string;
  sub_operator?: string;
}

export interface WildcardWhere {
  fields?: Array<string>;
  value?: string;
}

export interface IncludeFilter {
  relation?: string;
  select?: Array<any>;
  where?: CrudFilterWhere;
  order?: Array<any>;
  include?: Array<any>;
  include_count?: Array<any>;
}

export interface IncludeCountFilter {
  relation?: string;
  where?: CrudFilterWhere;
}

export interface OrderBy {
  field?: string;
  order?: string;
}

export interface CrudFilter {
  select?: Array<string>;
  where?: CrudFilterWhere;
  order?: Array<OrderBy>;
  include?: Array<IncludeFilter>;
  include_count?: Array<IncludeCountFilter>;
}

