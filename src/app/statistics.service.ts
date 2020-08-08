import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(protected http: HttpClient) { }

  public topPaidEmployees(limit = 20) {
    const endPoint = environment.apiUrl + 'statistics/top-paid-employees';
    let params: any = {};
    params.limit = limit;
    return this.http.get(endPoint, { params });
  }

  public averageSalaryByAge() {
    const endPoint = environment.apiUrl + 'statistics/average-salary-by-age';
    let params: any = {};
    return this.http.get(endPoint, { params });
  }
}
